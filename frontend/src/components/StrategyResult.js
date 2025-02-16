import React, { useState, useEffect } from "react";

const StrategyResult = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [parsedAnalysis, setParsedAnalysis] = useState([]);

  useEffect(() => {
    if (data) {
      setIsVisible(true);
      parseStrategicAnalysis(data.strategic_analysis);
    }
  }, [data]);

  const parseStrategicAnalysis = (text) => {
    if (!text) return;

    // Split the text into sections based on headings (e.g., **Heading**)
    const sections = text.split(/\*\*(.*?)\*\*/g).filter(Boolean);

    // Helper function to split section content into bullet points
    const splitIntoBullets = (content) => {
      if (!content) return [];
      return content
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item && !item.includes("**"))
        .map((item) => item.replace(/^[•*.-]\s*/, ""));
    };

    // Parse strategic analysis
    const parsedSections = sections
      .filter((section, index) => index % 2 === 1) // Get headings
      .map((heading, index) => ({
        heading,
        content: splitIntoBullets(sections[index * 2 + 2]),
      }));

    setParsedAnalysis(parsedSections);
  };

  if (!data || !data.strategic_analysis) return null;

  return (
    <div
      style={{
        ...styles.container,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div style={styles.resultCard}>
        <div style={styles.cardHeader}>
          <span style={styles.headerEmoji}>📊</span>
          <h3 style={styles.headerTitle}>Strategic Business Advice</h3>
        </div>

        <div style={styles.analysisContent}>
          {/* Strategic Analysis */}
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>
              <span style={styles.icon}>📋</span> Strategic Analysis
            </h4>
            {parsedAnalysis.map((section, index) => (
              <div key={index} style={styles.subSection}>
                <h5 style={styles.subHeading}>{section.heading}</h5>
                <ul style={styles.bulletList}>
                  {section.content.map((item, idx) => (
                    <li key={idx} style={styles.bulletItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
  subSection: {
    marginBottom: "1rem",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  subHeading: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#fef4af",
    margin: "0 0 0.5rem 0",
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
  "@keyframes float": {
    "0%, 100%": {
      transform: "translateY(0)",
    },
    "50%": {
      transform: "translateY(-5px)",
    },
  },
};

export default StrategyResult;