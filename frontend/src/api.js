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

// API Functions
export const getStrategy = (data) => fetchFromAPI("/get-strategy", data);
export const validateIdea = (data) => fetchFromAPI("/validate-idea", data);

export const sendMessageToChatbot = async (message) => {
    return fetchFromAPI("/chatbot", { prompt: message }); // ✅ Use "prompt" instead of "message"
};