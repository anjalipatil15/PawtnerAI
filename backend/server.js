const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const chatbotRoutes = require("./chatbot");
const path = require('path');
const fs = require('fs');

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/chatbot", chatbotRoutes);

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==============================
// 🚀 EXISTING FUNCTION: /get-strategy
// ==============================
app.post("/get-strategy", async (req, res) => {
  const { companyStage, currentChallenges, industryContext, businessModel, keyMetrics } = req.body;

  console.log("Received request with data:", req.body); // Log request data

  if (!companyStage || !currentChallenges || !industryContext) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Provide strategic advice for a company at the ${companyStage} stage in the ${industryContext} industry. The company is facing the following challenges: ${currentChallenges}. Business model: ${businessModel}. Key metrics: ${keyMetrics}.`;

    console.log("Generated prompt:", prompt); // Log generated prompt

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    console.log("Generated response:", response); // Log generated response

    res.json({
      strategic_analysis: response,
      priority_score: 75, // Example priority score
      growth_opportunities: {
        marketExpansion: "Expand into new markets.",
        revenueStreams: "Diversify revenue streams.",
        operationalEfficiency: "Improve operational efficiency.",
      },
      action_plan: {
        immediate: ["Action 1", "Action 2"],
        mediumTerm: ["Action 3", "Action 4"],
      },
      critical_success_factors: ["Factor 1", "Factor 2"],
      priority_explanation: "This is a high priority due to...",
    });
  } catch (error) {
    console.error("Error in /get-strategy:", error); // Log error
    res.status(500).json({ error: "Failed to generate strategy" });
  }
});

// ==============================
// ✨ NEW FUNCTION: /validate-idea
// ==============================
app.post("/validate-idea", async (req, res) => {
  try {
    const { idea, market, targetCustomers } = req.body;

    if (!idea || !market || !targetCustomers) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      Analyze this startup idea:
      IDEA: ${idea}
      TARGET MARKET: ${market}
      TARGET CUSTOMERS: ${targetCustomers}
      
      Provide validation, risks, and recommendations in the following format:
      ### Validation:
      - [Validation Point 1]
      - [Validation Point 2]
      
      ### Risks:
      - [Risk 1]
      - [Risk 2]
      
      ### Recommendations:
      - [Recommendation 1]
      - [Recommendation 2]
      
      ### Conclusion:
      [Conclusion Text]
    `;

    console.log("Generated idea validation prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    console.log("Generated idea validation response:", response);

    // Parse the response using regex
    const validationRegex = /### Validation:\s*((?:-.*\s*)*)/;
    const risksRegex = /### Risks:\s*((?:-.*\s*)*)/;
    const recommendationsRegex = /### Recommendations:\s*((?:-.*\s*)*)/;
    const conclusionRegex = /### Conclusion:\s*(.*)/;

    const validation = (response.match(validationRegex)?.[1]?.trim() || "");
    const risks = (response.match(risksRegex)?.[1]?.trim() || "");
    const recommendations = (response.match(recommendationsRegex)?.[1]?.trim() || "");
    const conclusion = (response.match(conclusionRegex)?.[1]?.trim() || "");

    res.json({
      analysis: {
        validation: validation.split("\n").map((line) => line.trim()).filter((line) => line),
        risks: risks.split("\n").map((line) => line.trim()).filter((line) => line),
        recommendations: recommendations.split("\n").map((line) => line.trim()).filter((line) => line),
        conclusion,
      },
    });
  } catch (error) {
    console.error("Error in /validate-idea:", error);
    res.status(500).json({ error: "Failed to validate idea" });
  }
});

// ==============================
// ✨ NEW FUNCTION: /upload-file
// ==============================
app.post("/upload-file", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;
    console.log("Received file:", file.name);

    // Move file to uploads directory (adjust path as needed)
    file.mv(`./uploads/${file.name}`, (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(500).json({ error: "Failed to upload file" });
      }

      res.json({ message: "File uploaded successfully", fileName: file.name });
    });
  } catch (error) {
    console.error("Error in /upload-file:", error);
    res.status(500).json({ error: "Failed to process file upload" });
  }
});
// ==============================
// Import RAG functionality
// ==============================
const { initVectorStore, processDocument, processTextContent, processAllDocuments } = require("./rag");

// Initialize RAG when server starts
(async () => {
  try {
    await initVectorStore();
    console.log('RAG system initialized successfully');
  } catch (error) {
    console.error('Failed to initialize RAG system:', error);
  }
})();

// ==============================
// 📚 NEW ENDPOINT: Process uploaded file for RAG
// ==============================
app.post("/rag/process-file", async (req, res) => {
  try {
    // Use the file from the /upload-file endpoint or allow direct upload
    if (!req.files && !req.body.fileName) {
      return res.status(400).json({ error: "No file specified" });
    }

    let filePath;
    
    // Handle direct file upload
    if (req.files && req.files.file) {
      const file = req.files.file;
      
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      filePath = path.join(__dirname, 'uploads', file.name);
      
      await new Promise((resolve, reject) => {
        file.mv(filePath, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    } 
    // Handle previously uploaded file
    else if (req.body.fileName) {
      filePath = path.join(__dirname, 'uploads', req.body.fileName);
    }

    // Process the document and add to knowledge base
    const result = await processDocument(filePath);
    
    res.json({
      message: "Document processed and added to knowledge base",
      result
    });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({ error: "Failed to process document" });
  }
});

// ==============================
// 📚 NEW ENDPOINT: Process text directly for RAG
// ==============================
app.post("/rag/process-text", async (req, res) => {
  try {
    const { text, source } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text content is required" });
    }

    // Process the text content
    const result = await processTextContent(text, source || "Manual Input");
    
    res.json({
      message: "Text processed and added to knowledge base",
      result
    });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({ error: "Failed to process text" });
  }
});

// ==============================
// 📚 NEW ENDPOINT: Process all documents in uploads folder
// ==============================
app.post("/rag/process-all", async (req, res) => {
  try {
    const results = await processAllDocuments();
    
    res.json({
      message: "All documents processed",
      results
    });
  } catch (error) {
    console.error("Error processing all documents:", error);
    res.status(500).json({ error: "Failed to process documents" });
  }
});

// ==============================
// 🚀 SERVER START
// ==============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});