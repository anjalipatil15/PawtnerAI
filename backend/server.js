require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatbotRoutes = require("./chatbot"); // Import chatbot API

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON
app.use("/chatbot", chatbotRoutes); // Route for chatbot API

const PORT = process.env.PORT || 5000; // Default port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
