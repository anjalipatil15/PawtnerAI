const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const app = express();
require("dotenv").config();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

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
      
      Provide validation, risks, and recommendations.
    `;

    console.log("Generated idea validation prompt:", prompt);

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    console.log("Generated idea validation response:", response);

    res.json({ analysis: response });
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
// 🚀 SERVER START
// ==============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
