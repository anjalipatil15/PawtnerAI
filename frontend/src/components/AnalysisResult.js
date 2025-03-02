import React, { useEffect, useState } from "react";

const AnalysisResult = ({ analysis }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [parsedAnalysis, setParsedAnalysis] = useState(null);

  useEffect(() => {
    if (analysis && typeof analysis === "object") {
      setIsVisible(true);
      setParsedAnalysis(parseAnalysis(analysis));
    }
  }, [analysis]);

  // Parse the analysis response
  const parseAnalysis = (data) => {
    if (!data || typeof data !== "object") return null;
  
    // Extract and sanitize data
    const extractList = (field) =>
      data[field]
        ? data[field].map((line) => line.trim()).filter((line) => line !== "")
        : [];
  
    return {
      validation: extractList("validation"),
      risks: extractList("risks"),
      recommendations: extractList("recommendations"),
      conclusion: data.conclusion ? String(data.conclusion).trim() : null,
    };
  };

  const renderSection = (title, items, emoji) => {
    if (!items || (Array.isArray(items) && !items.length)) return null;

    return (
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
          <span style={styles.icon}>{emoji}</span> {title}
        </h4>
        {Array.isArray(items) ? (
          <ul style={styles.bulletList}>
            {items.map((item, index) => (
              <li key={index} style={styles.bulletItem}>{item}</li>
            ))}
          </ul>
        ) : (
          <p style={styles.sectionText}>{items}</p>
        )}
      </div>
    );
  };

  if (!parsedAnalysis) return null;

  return (
    <div style={{
      ...styles.container,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(20px)"
    }}>
      <div style={styles.resultCard}>
        <div style={styles.cardHeader}>
          <span style={styles.headerEmoji}>🚀</span>
          <h3 style={styles.headerTitle}>Startup Analysis Report</h3>
        </div>
        
        <div style={styles.analysisContent}>
          {/* Idea Summary */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>
              <span style={styles.icon}>💡</span> Startup Idea Summary
            </h4>
            <div style={styles.detailsGrid}>
              {parsedAnalysis.idea && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>IDEA:</span>
                  <span style={styles.detailValue}>{parsedAnalysis.idea}</span>
                </div>
              )}
              {parsedAnalysis.market && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>TARGET MARKET:</span>
                  <span style={styles.detailValue}>{parsedAnalysis.market}</span>
                </div>
              )}
              {parsedAnalysis.customers && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>TARGET CUSTOMERS:</span>
                  <span style={styles.detailValue}>{parsedAnalysis.customers}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Sections */}
          {renderSection("Market Validation", parsedAnalysis.validation, "📊")}
          {renderSection("Risk Assessment", parsedAnalysis.risks, "⚠️")}
          {renderSection("Strategic Recommendations", parsedAnalysis.recommendations, "🎯")}
          {parsedAnalysis.conclusion && renderSection("Conclusion", parsedAnalysis.conclusion, "📝")}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    marginTop: "1.5rem",
  },
  resultCard: {
    backgroundColor: "#345c66",
    borderRadius: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(254, 244, 175, 0.2)",
    overflow: "hidden",
  },
  cardHeader: {
    backgroundColor: "rgba(43, 74, 83, 0.9)",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderBottom: "1px solid rgba(254, 244, 175, 0.2)",
  },
  headerEmoji: {
    fontSize: "2rem",
  },
  headerTitle: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#fef4af",
    margin: 0,
  },
  analysisContent: {
    padding: "1.5rem",
  },
  section: {
    backgroundColor: "rgba(43, 74, 83, 0.8)",
    borderRadius: "0.75rem",
    padding: "1.25rem",
    marginBottom: "1.25rem",
    border: "1px solid rgba(254, 244, 175, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#fef4af",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0 0 1rem 0",
  },
  icon: {
    fontSize: "1.5rem",
  },
  detailsGrid: {
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  detailLabel: {
    color: "#fef4af",
    opacity: 0.8,
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  detailValue: {
    color: "#fef4af",
    fontSize: "1.125rem",
    fontWeight: "600",
  },
  bulletList: {
    margin: "0",
    padding: "0 0 0 1.25rem",
    listStyle: "none",
  },
  bulletItem: {
    color: "#fef4af",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "0.75rem",
    paddingLeft: "1rem",
  },
  sectionText: {
    color: "#fef4af",
    fontSize: "1rem",
    lineHeight: "1.6",
    margin: 0,
  },
};

export default AnalysisResult;
