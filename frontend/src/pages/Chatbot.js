import React, { useState } from "react";
import { sendMessageToChatbot } from "../api"; 

function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "50px auto",
            textAlign: "center",
            backgroundColor: "#345c66",
            color: "#fef4af",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        chatBox: {
            height: "300px",
            width: "100%",
            overflowY: "auto",
            border: "2px solid #fef4af",
            padding: "10px",
            borderRadius: "8px",
            backgroundColor: "#2d4f57",
            color: "#fef4af",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        inputContainer: {
            display: "flex",
            marginTop: "10px",
            width: "100%",
            gap: "10px",
            alignItems: "center",
        },
        messageInput: {
            flex: "1",
            padding: "10px",
            border: "2px solid #fef4af",
            borderRadius: "5px",
            backgroundColor: "#2d4f57",
            color: "#fef4af",
            outline: "none",
        },
        sendButton: {
            padding: "10px 20px",
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
        messageContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
        },
        userMessage: {
            alignSelf: "flex-end",
            backgroundColor: "#fef4af",
            color: "#345c66",
            padding: "8px",
            borderRadius: "5px",
            maxWidth: "70%",
            wordWrap: "break-word",
        },
        botMessage: {
            alignSelf: "flex-start",
            backgroundColor: "#2d4f57",
            color: "#fef4af",
            padding: "8px",
            borderRadius: "5px",
            maxWidth: "70%",
            wordWrap: "break-word",
        },
        username: {
            fontWeight: "bold",
            marginBottom: "3px",
        },
    };

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };
        setChat((prevChat) => [...prevChat, userMessage]);

        setMessage("");

        try {
            const response = await sendMessageToChatbot(message);
            const botMessage = { sender: "bot", text: response.reply };

            setChat((prevChat) => [...prevChat, botMessage]);
        } catch (error) {
            setChat((prevChat) => [...prevChat, { sender: "bot", text: "Error: Unable to reach AI" }]);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Chatbot</h2>

            {/* Chat Messages Box */}
            <div style={styles.chatBox}>
                {chat.map((msg, index) => (
                    <div key={index} style={styles.messageContainer}>
                        <span style={styles.username}>{msg.sender === "user" ? "You" : "Bot"}</span>
                        <div style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input & Send Button Below */}
            <div style={styles.inputContainer}>
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
        </div>
    );
}

export default Chatbot;
