import React, { useState } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (data.result) {
        let formattedOutput = data.result
          .replace(/(.?)/g, "<b>$1</b>") // Bold all text
          .replace(/\n/g, "<br>"); // Line breaks

        const botMessage = { role: "bot", text: formattedOutput };
        setMessages([...messages, userMessage, botMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.role === "user" ? styles.userMsg : styles.botMsg}
            dangerouslySetInnerHTML={{ __html: msg.text }} // Render formatted HTML
          />
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button style={styles.button} onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#121212",
    borderRadius: "10px",
    border:"1px";
    color: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    fontFamily: "Arial, sans-serif",
  },
  chatBox: {
    height: "350px",
    overflowY: "auto",
    padding: "10px",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    padding: "12px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  userMsg: {
    textAlign: "right",
    padding: "8px",
    margin: "6px",
    backgroundColor: "#007bff",
    borderRadius: "10px",
    display: "inline-block",
    maxWidth: "75%",
    color: "#fff",
  },
  botMsg: {
    textAlign: "left",
    padding: "8px",
    margin: "6px",
    backgroundColor: "#333",
    borderRadius: "10px",
    display: "inline-block",
    maxWidth: "75%",
  },
};

export default Chatbot;
