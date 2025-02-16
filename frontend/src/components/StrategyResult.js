import React, { useState, useEffect } from "react";

const StrategyResult = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setIsVisible(true);
    }
  }, [data]);

  // Function to format the strategic analysis text
  const formatStrategicAnalysis = (text) => {
    if (!text) return null;

    // Split the text into sections based on double newlines
    const sections = text.split("\n\n");

    return sections.map((section, index) => {
      // Check if the section is a heading (starts with **)
      if (section.startsWith("**") && section.endsWith("**")) {
        return (
          <h4 key={index} style={styles.subHeading}>
            {section.replace(/\*\*/g, "")}
          </h4>
        );
      }

      // Check if the section contains bullet points
      if (section.includes("* ")) {
        const bulletPoints = section.split("\n").filter((line) => line.trim() !== "");
        return (
          <ul key={index} style={styles.list}>
            {bulletPoints.map((point, idx) => (
              <li key={idx} style={styles.listItem}>
                {point.replace("* ", "")}
              </li>
            ))}
          </ul>
        );
      }

      // Default to paragraph formatting
      return (
        <p key={index} style={styles.paragraph}>
          {section}
        </p>
      );
    });
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
      <div style={styles.header}>
        <span style={styles.headerEmoji}>📊</span>
        <h2 style={styles.title}>Strategic Business Advice</h2>
      </div>

      {/* Strategic Analysis */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>
          <span style={styles.emoji}>📋</span> Strategic Analysis
        </h3>
        <div style={styles.content}>{formatStrategicAnalysis(data.strategic_analysis)}</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#345c66",
    borderRadius: "1rem",
    padding: "2rem",
    marginTop: "1.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 15px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(254, 244, 175, 0.2)",
    color: "#fef4af",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily: "'Montserrat', sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  headerEmoji: {
    fontSize: "2.5rem",
    animation: "float 3s infinite",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: 0,
    color: "#fef4af",
  },
  section: {
    backgroundColor: "rgba(43, 74, 83, 0.8)",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    border: "1px solid rgba(254, 244, 175, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  emoji: {
    fontSize: "1.5rem",
  },
  content: {
    backgroundColor: "rgba(43, 74, 83, 0.9)",
    padding: "1.25rem",
    borderRadius: "0.5rem",
    border: "1px solid rgba(254, 244, 175, 0.05)",
  },
  subHeading: {
    fontSize: "1.125rem",
    fontWeight: "600",
    margin: "1.5rem 0 0.75rem 0",
    color: "#fef4af",
  },
  paragraph: {
    marginBottom: "1rem",
    lineHeight: "1.6",
    fontSize: "1rem",
    "&:last-child": {
      marginBottom: 0,
    },
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 1rem 0",
  },
  listItem: {
    marginBottom: "0.75rem",
    paddingLeft: "1.5rem",
    position: "relative",
    lineHeight: "1.6",
    "&:before": {
      content: '"•"',
      position: "absolute",
      left: 0,
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