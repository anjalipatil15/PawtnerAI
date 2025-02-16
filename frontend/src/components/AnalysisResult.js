import React, { useEffect, useState } from "react";

const AnalysisResult = ({ analysis }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [parsedData, setParsedData] = useState({
    idea: '',
    market: '',
    customers: '',
    validation: [],
    risks: [],
    recommendations: [],
    conclusion: ''
  });

  useEffect(() => {
    if (analysis) {
      setIsVisible(true);
      parseAnalysis(analysis);
    }
  }, [analysis]);

  const parseAnalysis = (text) => {
    // Parse initial idea details
    const ideaMatch = text.match(/IDEA:\s*([^\n]+)/i);
    const marketMatch = text.match(/TARGET MARKET:\s*([^\n]+)/i);
    const customersMatch = text.match(/TARGET CUSTOMERS:\s*([^\n]+)/i);

    // Parse sections using regex
    const validationSection = text.match(/\*\*Validation\*\*([\s\S]*?)(?=\*\*Risks\*\*|$)/i);
    const risksSection = text.match(/\*\*Risks\*\*([\s\S]*?)(?=\*\*Recommendations\*\*|$)/i);
    const recommendationsSection = text.match(/\*\*Recommendations\*\*([\s\S]*?)(?=\*\*Overall\*\*|$)/i);
    const conclusionMatch = text.match(/\*\*Overall\*\*([\s\S]*?)$/i);

    // Helper function to split section content into bullet points
    const splitIntoBullets = (content) => {
      if (!content) return [];
      return content
        .split('\n')
        .map(item => item.trim())
        .filter(item => item && !item.includes('**'))
        .map(item => item.replace(/^[•*.-]\s*/, ''));
    };

    setParsedData({
      idea: ideaMatch?.[1]?.trim() || '',
      market: marketMatch?.[1]?.trim() || '',
      customers: customersMatch?.[1]?.trim() || '',
      validation: splitIntoBullets(validationSection?.[1]),
      risks: splitIntoBullets(risksSection?.[1]),
      recommendations: splitIntoBullets(recommendationsSection?.[1]),
      conclusion: conclusionMatch?.[1]?.trim() || ''
    });
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

  if (!analysis) return null;

  return (
    <div style={{
      ...styles.container,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
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
              {parsedData.idea && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>IDEA:</span>
                  <span style={styles.detailValue}>{parsedData.idea}</span>
                </div>
              )}
              {parsedData.market && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>TARGET MARKET:</span>
                  <span style={styles.detailValue}>{parsedData.market}</span>
                </div>
              )}
              {parsedData.customers && (
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>TARGET CUSTOMERS:</span>
                  <span style={styles.detailValue}>{parsedData.customers}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Sections */}
          {renderSection('Market Validation', parsedData.validation, '📊')}
          {renderSection('Risk Assessment', parsedData.risks, '⚠️')}
          {renderSection('Strategic Recommendations', parsedData.recommendations, '🎯')}
          {parsedData.conclusion && renderSection('Conclusion', parsedData.conclusion, '📝')}
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
    animation: "float 3s infinite",
  },
  headerTitle: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    color: "#fef4af",
    fontFamily: "'Montserrat', sans-serif",
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
    "&:last-child": {
      marginBottom: 0,
    },
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#fef4af",
    fontFamily: "'Montserrat', sans-serif",
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
    position: "relative",
    paddingLeft: "1rem",
    "&:before": {
      content: '"•"',
      position: "absolute",
      left: "-1rem",
      color: "#fef4af",
    },
    "&:last-child": {
      marginBottom: 0,
    },
  },
  sectionText: {
    color: "#fef4af",
    fontSize: "1rem",
    lineHeight: "1.6",
    margin: 0,
  },
  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(-5px)",
    },
  },
};

export default AnalysisResult;