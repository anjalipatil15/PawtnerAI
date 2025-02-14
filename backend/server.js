import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
    try {
        const userPrompt = req.body.prompt;

        if (!userPrompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [{ parts: [{ text: userPrompt }] }]
            },
            {
                headers: { "Content-Type": "application/json" },
                params: { key: process.env.GEMINI_API_KEY }
            }
        );

        if (response.data.candidates && response.data.candidates.length > 0) {
            res.json({ result: response.data.candidates[0].content.parts[0].text });
        } else {
            res.status(500).json({ error: "No response generated" });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.get("/", (req, res) => {
    res.send("🔥 Server is running! 🚀");
});

app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));