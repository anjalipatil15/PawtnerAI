import React, { useState } from "react";
import { processFileForRAG, processTextForRAG } from "../api";

const DocumentUploader = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [uploadType, setUploadType] = useState("file"); // "file" or "text"

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#345c66",
      color: "#fef4af",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    label: {
      fontWeight: "bold",
    },
    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #fef4af",
      backgroundColor: "#2d4f57",
      color: "#fef4af",
    },
    textarea: {
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #fef4af",
      backgroundColor: "#2d4f57",
      color: "#fef4af",
      minHeight: "150px",
      resize: "vertical",
    },
    button: {
      padding: "12px",
      backgroundColor: "#fef4af",
      color: "#345c66",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#ffdb70",
    },
    message: {
      marginTop: "15px",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#2d4f57",
      border: "1px solid #4CAF50",
    },
    error: {
      marginTop: "15px",
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#2d4f57",
      border: "1px solid #f44336",
    },
    tabs: {
      display: "flex",
      marginBottom: "15px",
    },
    tab: {
      padding: "10px 15px",
      cursor: "pointer",
      backgroundColor: "#2d4f57",
      flex: 1,
      textAlign: "center",
      borderBottom: "2px solid transparent",
    },
    activeTab: {
      borderBottom: "2px solid #fef4af",
      fontWeight: "bold",
    },
    fileInfo: {
      marginTop: "5px",
      fontSize: "0.9rem",
    },
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setError("");
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setMessage("");
    setError("");
  };

  const handleSourceNameChange = (e) => {
    setSourceName(e.target.value);
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    
    setLoading(true);
    setMessage("");
    setError("");
    
    try {
      const result = await processFileForRAG(file);
      setMessage(`File processed successfully! Added ${result.result.chunksAdded} chunks to the knowledge base.`);
      setFile(null);
      // Reset the file input
      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadText = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError("Please enter some text to process");
      return;
    }
    
    setLoading(true);
    setMessage("");
    setError("");
    
    try {
      const result = await processTextForRAG(text, sourceName || "Manual Input");
      setMessage(`Text processed successfully! Added ${result.result.chunksAdded} chunks to the knowledge base.`);
      setText("");
      setSourceName("");
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Add Knowledge to Chatbot</h2>
      
      <div style={styles.tabs}>
        <div 
          style={{
            ...styles.tab,
            ...(uploadType === "file" ? styles.activeTab : {})
          }}
          onClick={() => setUploadType("file")}
        >
          Upload File
        </div>
        <div 
          style={{
            ...styles.tab,
            ...(uploadType === "text" ? styles.activeTab : {})
          }}
          onClick={() => setUploadType("text")}
        >
          Add Text
        </div>
      </div>
      
      {uploadType === "file" ? (
        <form style={styles.form} onSubmit={handleUploadFile}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="file-upload">
              Select Document
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              style={styles.input}
              accept=".txt,.js,.json,.html,.md,.css"
            />
            {file && (
              <div style={styles.fileInfo}>
                Selected: {file.name} ({Math.round(file.size / 1024)} KB)
              </div>
            )}
          </div>
          
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.button.backgroundColor;
            }}
          >
            {loading ? "Processing..." : "Upload & Process"}
          </button>
        </form>
      ) : (
        <form style={styles.form} onSubmit={handleUploadText}>
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="source-name">
              Source Name (optional)
            </label>
            <input
              type="text"
              id="source-name"
              value={sourceName}
              onChange={handleSourceNameChange}
              style={styles.input}
              placeholder="e.g., Company Policy, Product Info"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="text-content">
              Text Content
            </label>
            <textarea
              id="text-content"
              value={text}
              onChange={handleTextChange}
              style={styles.textarea}
              placeholder="Paste your text content here..."></textarea>
          </div>
          
          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseOver={(e) => {
              if (!loading) e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = styles.button.backgroundColor;
            }}
          >
            {loading ? "Processing..." : "Process Text"}
          </button>
        </form>
      )}
      
      {message && <div style={styles.message}>{message}</div>}
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default DocumentUploader;