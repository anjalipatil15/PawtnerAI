import React, { useState, useEffect, useRef } from "react";
import { sendMessageToChatbot } from "../api";
import DocumentUploader from "../components/DocumentUploader";

function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showUploader, setShowUploader] = useState(false);
    const chatBoxRef = useRef(null);

    const parseMessage = (text) => {
        if (!text) return { plain: text };
        
        // Parse sections with headings
        const sections = text.split(/\*\*(.*?)\*\*/g).filter(Boolean);
        
        if (sections.length <= 1) return { plain: text };

        // Parse bullet points
        const parsedSections = sections
            .filter((section, index) => index % 2 === 1)
            .map((heading, index) => ({
                heading,
                content: sections[index * 2 + 2]
                    ?.split("\n")
                    .map(item => item.trim())
                    .filter(item => item && !item.includes("**"))
                    .map(item => item.replace(/^[•*.-]\s*/, ""))
                    .filter(Boolean) || []
            }));

        return { structured: parsedSections };
    };

    const styles = {
        container: {
            maxWidth: "800px",
            margin: "30px auto",
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
        chatContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
        },
        chatBox: {
            height: "400px",
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
            width: "100%",
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
            border: "1px solid rgba(254, 244, 175, 0.2)",
        },
        username: {
            fontWeight: "bold",
            marginBottom: "3px",
        },
        structuredMessage: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
        },
        structuredSection: {
            backgroundColor: "rgba(43, 74, 83, 0.8)",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid rgba(254, 244, 175, 0.1)",
        },
        sectionHeading: {
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "4px",
            color: "#fef4af",
        },
        bulletList: {
            margin: "0",
            paddingLeft: "16px",
            listStyle: "disc",
        },
        bulletItem: {
            marginBottom: "4px",
            lineHeight: "1.4",
        },
        typingIndicator: {
            alignSelf: "flex-start",
            color: "#fef4af",
            opacity: 0.7,
            padding: "4px 8px",
            fontSize: "14px",
        },
        sources: {
            marginTop: "6px",
            fontSize: "12px",
            opacity: 0.8,
            padding: "4px 8px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            width: "100%",
        },
        sourcesTitle: {
            fontWeight: "bold",
            marginBottom: "2px",
        },
        actionButtons: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "15px",
        },
        actionButton: {
            padding: "8px 15px",
            backgroundColor: "#2d4f57",
            color: "#fef4af",
            border: "1px solid #fef4af",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
        },
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chat]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };
        setChat((prevChat) => [...prevChat, userMessage]);
        setMessage("");
        setIsTyping(true);

        try {
            const response = await sendMessageToChatbot(message);
            const parsedResponse = parseMessage(response.reply);
            const botMessage = { 
                sender: "bot", 
                text: response.reply,
                parsed: parsedResponse,
                sources: response.sources || [], // Include sources from RAG
                fallback: response.fallback || false
            };

            setChat((prevChat) => [...prevChat, botMessage]);
        } catch (error) {
            setChat((prevChat) => [
                ...prevChat, 
                { sender: "bot", text: "Error: Unable to reach AI", error: true }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const renderStructuredMessage = (parsed) => (
        <div style={styles.structuredMessage}>
            {parsed.map((section, idx) => (
                <div key={idx} style={styles.structuredSection}>
                    <div style={styles.sectionHeading}>{section.heading}</div>
                    <ul style={styles.bulletList}>
                        {section.content.map((item, i) => (
                            <li key={i} style={styles.bulletItem}>{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    const renderSources = (sources) => {
        if (!sources || sources.length === 0) return null;
        
        return (
            <div style={styles.sources}>
                <div style={styles.sourcesTitle}>Sources:</div>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                    {sources.map((source, idx) => (
                        <li key={idx} style={{ fontSize: "11px" }}>
                            {source.source} (Relevance: {source.relevance})
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const toggleUploader = () => {
        setShowUploader(!showUploader);
    };

    return (
        <div style={styles.container}>
            <h2>AI Assistant</h2>
            
            <div style={styles.actionButtons}>
                <button 
                    style={styles.actionButton}
                    onClick={toggleUploader}
                >
                    {showUploader ? "Hide Knowledge Uploader" : "Add Knowledge to Assistant"}
                </button>
            </div>
            
            {showUploader && <DocumentUploader />}

            <div style={styles.chatContainer}>
                <div style={styles.chatBox} ref={chatBoxRef}>
                    {chat.map((msg, index) => (
                        <div key={index} style={styles.messageContainer}>
                            <span style={styles.username}>
                                {msg.sender === "user" ? "You" : "AI"}
                                {msg.fallback && " (Standard Mode)"}
                            </span>
                            <div 
                                style={{
                                    ...msg.sender === "user" ? styles.userMessage : styles.botMessage,
                                    ...(msg.error && {
                                        backgroundColor: "#ff6b6b",
                                        color: "#ffffff",
                                    })
                                }}
                            >
                                {msg.parsed?.structured 
                                    ? renderStructuredMessage(msg.parsed.structured)
                                    : msg.text}
                            </div>
                            {msg.sources && renderSources(msg.sources)}
                        </div>
                    ))}
                    {isTyping && (
                        <div style={styles.typingIndicator}>
                            AI is thinking...
                        </div>
                    )}
                </div>

                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
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
        </div>
    );
}

export default Chatbot;