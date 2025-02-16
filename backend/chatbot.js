const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
       
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        
       
        const formattedResponse = response.replace(/\n/g, "<br>");


        res.json({ reply: response });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Failed to generate chatbot response" });
    }
});

module.exports = router; 
