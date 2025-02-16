import React, { useState } from "react";

const IdeaForm = ({ onSubmit }) => {
  const [idea, setIdea] = useState("");
  const [market, setMarket] = useState("");
  const [customers, setCustomers] = useState("");
  const [activeField, setActiveField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idea || !market || !customers) {
      alert("⚠ Please fill in all fields.");
      return;
    }
    onSubmit({ idea, market, targetCustomers: customers });
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h2 style={styles.title}>Validate Your Idea</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Idea</label>
            <div style={{
              ...styles.inputWrapper,
              ...(activeField === 'idea' ? styles.activeInput : {})
            }}>
              <textarea
                style={styles.textarea}
                rows="3"
                maxLength="500"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Describe your innovative startup idea..."
                required
                onFocus={() => handleFocus('idea')}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Target Market</label>
            <div style={{
              ...styles.inputWrapper,
              ...(activeField === 'market' ? styles.activeInput : {})
            }}>
              <input
                type="text"
                style={styles.input}
                maxLength="100"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                placeholder="e.g., Healthcare, SaaS, Education"
                required
                onFocus={() => handleFocus('market')}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Target Customers</label>
            <div style={{
              ...styles.inputWrapper,
              ...(activeField === 'customers' ? styles.activeInput : {})
            }}>
              <input
                type="text"
                style={styles.input}
                maxLength="100"
                value={customers}
                onChange={(e) => setCustomers(e.target.value)}
                placeholder="e.g., Small businesses, Developers, Freelancers"
                required
                onFocus={() => handleFocus('customers')}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#fef4af";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 15px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#fef4af";
              e.target.style.color = "#2E4F4F";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Validate
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#345c66",
    padding: "1.5rem",
  },
  formCard: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#2E4F4F",
    padding: "2.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(254, 244, 175, 0.2)",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#fef4af",
    textAlign: "center",
    marginBottom: "2.5rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  label: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#fef4af",
    marginBottom: "0.5rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: "rgba(254, 244, 175, 0.1)",
    borderRadius: "0.75rem",
    padding: "0.25rem",
    border: "1px solid rgba(254, 244, 175, 0.2)",
    transition: "all 0.3s ease",
  },
  activeInput: {
    backgroundColor: "rgba(254, 244, 175, 0.15)",
    border: "1px solid rgba(254, 244, 175, 0.4)",
    boxShadow: "0 0 20px rgba(254, 244, 175, 0.1)",
  },
  input: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "transparent",
    color: "#fef4af",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  textarea: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "transparent",
    color: "#fef4af",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "120px",
    fontFamily: "'Montserrat', sans-serif",
  },
  submitButton: {
    padding: "1.25rem",
    backgroundColor: "#fef4af",
    color: "#2E4F4F",
    border: "2px solid #fef4af",
    borderRadius: "0.75rem",
    fontSize: "1.125rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default IdeaForm;