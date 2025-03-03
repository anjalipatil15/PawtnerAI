const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Generic API Fetch Helper
const fetchFromAPI = async (endpoint, data, method = "POST") => {
  try {
    console.log(`📡 Sending request to: ${BASE_URL}${endpoint}`, data); // Debugging Request

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      mode: "cors",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorMessage}`);
    }

    const result = await response.json();
    console.log(`✅ API Response from ${endpoint}:`, result); // Debugging Response
    return result;
  } catch (error) {
    console.error(`❌ API Error (${endpoint}):`, error.message);
    throw error;
  }
};

// File Upload API Helper
const uploadFileToAPI = async (endpoint, file, extraData = {}) => {
  try {
    console.log(`📡 Uploading file to: ${BASE_URL}${endpoint}`, file.name);

    const formData = new FormData();
    formData.append('file', file);
    
    // Add any extra data fields
    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      body: formData,
      mode: "cors",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorMessage}`);
    }

    const result = await response.json();
    console.log(`✅ File upload response from ${endpoint}:`, result);
    return result;
  } catch (error) {
    console.error(`❌ File upload error (${endpoint}):`, error.message);
    throw error;
  }
};

// Existing API Functions
export const getStrategy = (data) => fetchFromAPI("/get-strategy", data);
export const validateIdea = async (data) => {
  try {
    const response = await fetchFromAPI("/validate-idea", data);
    return response;
  } catch (error) {
    console.error("Error validating idea:", error);
    throw error;
  }
};

export const sendMessageToChatbot = async (message) => {
  return fetchFromAPI("/chatbot", { prompt: message });
};

// New RAG API Functions
export const uploadFile = async (file) => {
  return uploadFileToAPI("/upload-file", file);
};

export const processFileForRAG = async (file) => {
  // First upload the file
  const uploadResult = await uploadFileToAPI("/upload-file", file);
  
  // Then process it for RAG
  const processResult = await fetchFromAPI("/rag/process-file", { 
    fileName: uploadResult.fileName 
  });
  
  return processResult;
};

export const processTextForRAG = async (text, source) => {
  return fetchFromAPI("/rag/process-text", { text, source });
};

export const processAllDocumentsForRAG = async () => {
  return fetchFromAPI("/rag/process-all", {});
};