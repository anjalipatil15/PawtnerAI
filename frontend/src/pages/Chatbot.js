import React, { useState } from "react";
import axios from "axios";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "50px auto",
            textAlign: "center",
            backgroundColor: "#345c66", // Matches the theme
            color: "#fef4af",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        },
        chatBox: {
            height: "300px",
            overflowY: "auto",
            border: "2px solid #fef4af",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#2d4f57",
            color: "#fef4af",
        },
        messageInput: {
            width: "75%",
            padding: "10px",
            border: "2px solid #fef4af",
            borderRadius: "5px",
            backgroundColor: "#2d4f57",
            color: "#fef4af",
            outline: "none",
        },
        sendButton: {
            padding: "10px",
            marginLeft: "10px",
            backgroundColor: "#fef4af",
            color: "#345c66",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
        },
        sendButtonHover: {
            backgroundColor: "#ffdb70",
        },
        message: (sender) => ({
            textAlign: sender === "user" ? "right" : "left",
            margin: "5px 0",
            padding: "8px",
            borderRadius: "5px",
            display: "inline-block",
            backgroundColor: sender === "user" ? "#fef4af" : "#2d4f57",
            color: sender === "user" ? "#345c66" : "#fef4af",
        }),
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };
        setChat([...chat, userMessage]);

        setMessage("");

        try {
            const response = await axios.post("http://localhost:5000/chatbot", { message });
            const botMessage = { sender: "bot", text: response.data.reply };

            setChat([...chat, userMessage, botMessage]);
        } catch (error) {
            setChat([...chat, userMessage, { sender: "bot", text: "Error: Unable to reach AI" }]);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Chatbot</h2>
            <div style={styles.chatBox}>
                {chat.map((msg, index) => (
                    <div key={index} style={styles.message(msg.sender)}>
                        <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>
                        {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={styles.messageInput}
            />
            <button
                onClick={sendMessage}
                style={styles.sendButton}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.sendButtonHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.sendButton.backgroundColor)}
            >
                Send
            </button>
        </div>
    );
}

export default Chatbot;
