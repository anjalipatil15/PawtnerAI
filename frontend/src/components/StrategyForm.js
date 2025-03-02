import React, { useState } from "react";

const StrategyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyStage: "",
    currentChallenges: "",
    industryContext: "",
    businessModel: "",
    keyMetrics: "",
  });

  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData); // Log form data before submission
    onSubmit(formData);
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
        <h2 style={styles.title}>Strategic Business Analysis</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Company Stage */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Company Stage<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <select
                name="companyStage"
                style={styles.select}
                required
                onChange={handleChange}
                value={formData.companyStage}
                onFocus={() => handleFocus("companyStage")}
                onBlur={handleBlur}
              >
                <option value="">Select company stage...</option>
                <option value="Pre-seed / Idea Stage">Pre-seed / Idea Stage</option>
                <option value="Seed Stage">Seed Stage</option>
                <option value="Early Stage / Series A">Early Stage / Series A</option>
                <option value="Growth Stage / Series B-C">Growth Stage / Series B-C</option>
                <option value="Scale-up / Series D+">Scale-up / Series D+</option>
                <option value="Mature / Established">Mature / Established</option>
              </select>
            </div>
          </div>

          {/* Industry Context */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Industry Context<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="industryContext"
                style={styles.input}
                maxLength="200"
                required
                placeholder="e.g., SaaS, Healthcare, Retail"
                onChange={handleChange}
                value={formData.industryContext}
                onFocus={() => handleFocus("industryContext")}
                onBlur={handleBlur}
              />
            </div>
            <div style={styles.charCount}>
              {formData.industryContext.length}/200 characters
            </div>
          </div>

          {/* Current Challenges */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Current Challenges<span style={styles.required}>*</span>
            </label>
            <div style={styles.inputWrapper}>
              <textarea
                name="currentChallenges"
                style={styles.textarea}
                rows="3"
                maxLength="500"
                required
                placeholder="Describe the main challenges your company is facing"
                onChange={handleChange}
                value={formData.currentChallenges}
                onFocus={() => handleFocus("currentChallenges")}
                onBlur={handleBlur}
              />
            </div>
            <div style={styles.charCount}>
              {formData.currentChallenges.length}/500 characters
            </div>
          </div>

          {/* Business Model */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Business Model <span style={styles.optional}>(Optional)</span>
            </label>
            <div style={styles.inputWrapper}>
              <textarea
                name="businessModel"
                style={styles.textarea}
                rows="3"
                maxLength="500"
                placeholder="Describe your business model, revenue streams, pricing strategy..."
                onChange={handleChange}
                value={formData.businessModel}
                onFocus={() => handleFocus("businessModel")}
                onBlur={handleBlur}
              />
            </div>
            <div style={styles.charCount}>
              {formData.businessModel.length}/500 characters
            </div>
          </div>

          {/* Key Metrics */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              Key Metrics <span style={styles.optional}>(Optional)</span>
            </label>
            <div style={styles.inputWrapper}>
              <textarea
                name="keyMetrics"
                style={styles.textarea}
                rows="2"
                maxLength="300"
                placeholder="Share key metrics like MRR, CAC, LTV, growth rate..."
                onChange={handleChange}
                value={formData.keyMetrics}
                onFocus={() => handleFocus("keyMetrics")}
                onBlur={handleBlur}
              />
            </div>
            <div style={styles.charCount}>
              {formData.keyMetrics.length}/300 characters
            </div>
          </div>

          {/* Submit Button */}
          <div style={styles.submitSection}>
            <p style={styles.requiredNote}>* Required fields</p>
            <button type="submit" style={styles.submitButton}>
              Get Strategic Advice
            </button>
          </div>
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
    padding: "2rem",
  },
  formCard: {
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#2E4F4F",
    padding: "2.5rem",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(254, 244, 175, 0.2)",
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
    gap: "0.5rem",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fef4af",
    fontFamily: "'Montserrat', sans-serif",
  },
  required: {
    color: "#ff6b6b",
    marginLeft: "0.25rem",
  },
  optional: {
    color: "#fef4af",
    opacity: 0.6,
    fontWeight: "normal",
  },
  inputWrapper: {
    position: "relative",
    backgroundColor: "rgba(254, 244, 175, 0.1)",
    borderRadius: "0.75rem",
    padding: "0.25rem",
    border: "1px solid rgba(254, 244, 175, 0.2)",
    transition: "all 0.3s ease",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "transparent",
    color: "#fef4af",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    fontFamily: "'Montserrat', sans-serif",
  },
  select: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#345c66",
    color: "#fef4af",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    cursor: "pointer",
    appearance: "none",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "transparent",
    color: "#fef4af",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    resize: "vertical",
    fontFamily: "'Montserrat', sans-serif",
    minHeight: "80px",
  },
  charCount: {
    fontSize: "0.875rem",
    color: "#fef4af",
    opacity: 0.6,
    textAlign: "right",
  },
  submitSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
  },
  requiredNote: {
    fontSize: "0.875rem",
    color: "#fef4af",
    opacity: 0.6,
  },
  submitButton: {
    padding: "1rem 2rem",
    backgroundColor: "#fef4af",
    color: "#2E4F4F",
    border: "2px solid #fef4af",
    borderRadius: "0.75rem",
    fontSize: "1.125rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Montserrat', sans-serif",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default StrategyForm;