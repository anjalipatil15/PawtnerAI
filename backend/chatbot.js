const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

require("dotenv").config(); // Load API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", // Faster response
        });

        const chatSession = model.startChat({
            generationConfig: {
                temperature: 1,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 8192,
                responseMimeType: "text/plain",
            },
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const response = result.response.text();

        res.json({ reply: response });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;
