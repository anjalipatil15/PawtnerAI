// chatbot.js - Updated to use RAG
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const rag = require('./rag');
const ragQuery = rag.ragQuery; // Import RAG functionality

require("dotenv").config();

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        // Use RAG query instead of direct model call
        const ragResponse = await ragQuery(prompt);
        
        // Return the response
        res.json({ 
            reply: ragResponse.response,
            // Include context information for frontend display
            sources: ragResponse.context.map(ctx => ({
                source: ctx.source,
                relevance: ctx.score.toFixed(2)
            }))
        });
    } catch (error) {
        console.error("Chatbot error:", error);
        
        // Fallback to standard Gemini if RAG fails
        try {
            console.log("Falling back to standard Gemini response");
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            
            // ✅ Convert new lines to HTML <br> for frontend display if needed
            // const formattedResponse = response.replace(/\n/g, "<br>");
            
            res.json({ 
                reply: response,
                fallback: true // Indicate this was a fallback response
            });
        } catch (fallbackError) {
            console.error("Fallback error:", fallbackError);
            res.status(500).json({ error: "Failed to generate chatbot response" });
        }
    }
});

module.exports = router;