// rag.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
const fs = require('fs');
console.log('RAG module loaded');

// Initialize environment variables
require('dotenv').config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Path for storing the vector database
const VECTOR_STORE_PATH = path.join(__dirname, 'data', 'vector_store.json');

// Custom Gemini embeddings class
class GeminiEmbeddings {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.embeddingModel = this.genAI.getGenerativeModel({ model: "embedding-001" });
  }

  async embedDocuments(texts) {
    const embeddings = [];
    for (const text of texts) {
      try {
        const result = await this.embeddingModel.embedContent(text);
        const embedding = result.embedding.values;
        embeddings.push(embedding);
      } catch (error) {
        console.error(`Error embedding document: ${error.message}`);
        // Insert a zero vector as a fallback
        embeddings.push(new Array(768).fill(0));
      }
    }
    return embeddings;
  }

  async embedQuery(text) {
    const result = await this.embeddingModel.embedContent(text);
    return result.embedding.values;
  }
}

// Initialize Gemini Embeddings
const embeddings = new GeminiEmbeddings(process.env.GEMINI_API_KEY);

// Simple Vector Store class
class SimpleVectorStore {
  constructor(storagePath) {
    this.storagePath = storagePath || path.join(__dirname, 'vector_store.json');
    this.data = {
      vectors: [],
      metadatas: []
    };
    this.initialized = false;
  }

  async initialize() {
    try {
      // Create directory if it doesn't exist
      const dir = path.dirname(this.storagePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Try to load existing data
      if (fs.existsSync(this.storagePath)) {
        const fileData = await fs.promises.readFile(this.storagePath, 'utf8');
        this.data = JSON.parse(fileData);
        console.log(`Loaded ${this.data.vectors.length} vectors from storage`);
      } else {
        // If file doesn't exist, initialize with empty data
        console.log('No existing vector store found, creating new one');
        await this.save();
      }
    } catch (error) {
      console.error('Error initializing vector store:', error);
      // If error in reading, initialize with empty data and save
      await this.save();
    }
    this.initialized = true;
    return this;
  }

  async save() {
    try {
      // Ensure directory exists
      const dir = path.dirname(this.storagePath);
      await fs.promises.mkdir(dir, { recursive: true }).catch(() => {});
      
      // Save data to file
      await fs.promises.writeFile(this.storagePath, JSON.stringify(this.data), 'utf8');
      console.log(`Saved ${this.data.vectors.length} vectors to storage`);
    } catch (error) {
      console.error('Error saving vector store:', error);
      throw error;
    }
  }

  async addDocuments(vectors, metadatas) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // Add new vectors and metadata
    this.data.vectors.push(...vectors);
    this.data.metadatas.push(...metadatas);
    
    // Save to disk
    await this.save();
    return vectors.length;
  }

  // Compute cosine similarity between two vectors
  cosineSimilarity(vecA, vecB) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    
    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    
    if (normA === 0 || normB === 0) {
      return 0;
    }
    
    return dotProduct / (normA * normB);
  }

  async search(queryVector, k = 5) {
    if (!this.initialized) {
      await this.initialize();
    }
    
    if (this.data.vectors.length === 0) {
      return [];
    }
    
    // Calculate similarity scores
    const scores = this.data.vectors.map((vector, index) => ({
      index,
      score: this.cosineSimilarity(queryVector, vector)
    }));
    
    // Sort by score (descending)
    scores.sort((a, b) => b.score - a.score);
    
    // Get top k results
    const topK = scores.slice(0, k);
    
    // Return results with metadata
    return topK.map(item => ({
      metadata: this.data.metadatas[item.index],
      score: item.score
    }));
  }

  // Clear all vectors (useful for testing)
  async clear() {
    this.data = { vectors: [], metadatas: [] };
    await this.save();
  }
}

// Initialize vector store
let vectorStore = new SimpleVectorStore(VECTOR_STORE_PATH);

// Initialize or connect to vector store
async function initVectorStore() {
  try {
    await vectorStore.initialize();
    console.log('Vector store initialized');
    return vectorStore;
  } catch (error) {
    console.error('Error initializing vector store:', error);
    throw error;
  }
}

// Function to split text into chunks
function splitTextIntoChunks(text, chunkSize = 1000, overlap = 200) {
  if (!text) return [];
  
  const chunks = [];
  let i = 0;
  
  while (i < text.length) {
    // If we're not at the beginning, add overlap
    const start = i === 0 ? 0 : i - overlap;
    const end = Math.min(start + chunkSize, text.length);
    
    chunks.push(text.slice(start, end));
    
    i = end;
  }
  
  return chunks;
}

// Function to process text content
async function processTextContent(text, source) {
  try {
    console.log(`Processing text content from: ${source}`);
    
    // Split text into chunks
    const chunks = splitTextIntoChunks(text);
    console.log(`Split into ${chunks.length} chunks`);
    
    // Ensure vectorStore is initialized
    if (!vectorStore.initialized) {
      await initVectorStore();
    }
    
    // Get embeddings for all chunks
    const docEmbeddings = await embeddings.embedDocuments(chunks);
    
    // Prepare metadata
    const metadatas = chunks.map(chunk => ({
      text: chunk,
      source: source
    }));
    
    // Add documents to vector store
    await vectorStore.addDocuments(docEmbeddings, metadatas);
    console.log(`Added ${chunks.length} document chunks to vector store`);
    
    return { success: true, chunksAdded: chunks.length };
  } catch (error) {
    console.error('Error processing text content:', error);
    return { success: false, error: error.message };
  }
}

// Function to process a document file
async function processDocument(filePath) {
  try {
    console.log(`Processing document: ${filePath}`);
    
    // Read file content
    const content = await fs.promises.readFile(filePath, 'utf8');
    
    // Process the text content
    return await processTextContent(content, filePath);
  } catch (error) {
    console.error('Error processing document:', error);
    return { success: false, error: error.message };
  }
}

// Function to bulk process all documents in uploads directory
async function processAllDocuments() {
  const uploadsDir = path.join(__dirname, 'uploads');
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  const files = fs.readdirSync(uploadsDir);
  console.log(`Found ${files.length} files in uploads directory`);
  
  const results = [];
  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    // Only process files, not directories
    if (fs.statSync(filePath).isFile()) {
      const result = await processDocument(filePath);
      results.push({ file, ...result });
    }
  }
  
  return results;
}

// RAG query function - retrieve relevant context and generate response
async function ragQuery(userQuery, options = {}) {
  try {
    // Ensure vectorStore is initialized
    if (!vectorStore.initialized) {
      await initVectorStore();
    }
    
    // Set defaults
    const maxResults = options.maxResults || 5;
    const similarityThreshold = options.similarityThreshold || 0.7;
    
    console.log(`RAG Query: "${userQuery}"`);
    
    // Get query embedding
    const queryEmbedding = await embeddings.embedQuery(userQuery);
    
    // Retrieve relevant documents
    const results = await vectorStore.search(queryEmbedding, maxResults);
    console.log(`Retrieved ${results.length} relevant documents`);
    
    // Filter by similarity score
    const filteredResults = results.filter(result => result.score >= similarityThreshold);
    console.log(`Filtered to ${filteredResults.length} documents above threshold`);
    
    // Formulate context from retrieved documents
    let context = '';
    if (filteredResults.length > 0) {
      context = filteredResults.map(result => result.metadata.text).join('\n\n');
      console.log('Context assembled from retrieved documents');
    } else {
      console.log('No relevant context found in knowledge base');
    }
    
    // Generate response using Gemini
   
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Create prompt with retrieved context
    const prompt = `
      I want you to answer the user's question based on the context provided, if relevant.
      If the context doesn't contain relevant information, just answer based on your general knowledge.
      
      CONTEXT:
      ${context}
      
      USER QUERY:
      ${userQuery}
      
      Please provide a detailed, helpful response based on the context above.
    `;
    
    console.log('Sending prompt to Gemini');
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    return {
      query: userQuery,
      context: filteredResults.map(result => ({
        content: result.metadata.text,
        score: result.score,
        source: result.metadata.source
      })),
      response: response
    };
  } catch (error) {
    console.error('Error in RAG query:', error);
    throw error;
  }
}

module.exports = {
  initVectorStore,
  processDocument,
  processTextContent,
  processAllDocuments,
  ragQuery
};