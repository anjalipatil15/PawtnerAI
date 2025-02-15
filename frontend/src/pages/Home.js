import React, { useState } from "react";

const Home = () => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      textAlign: "center",
      backgroundColor: "#345c66", 
      color: "#fef4af",
      padding: "20px",
    },
    logo: {
      fontSize: "10.5rem",
      fontWeight: "bold",
      color: "#fef4af",
      lineHeight: "1",
      width: "100%",
      textAlign: "center",
      fontFamily: "'Montserrat', sans-serif",
    },
    tagline: {
      fontSize: "1.2rem",
      color: "#fef4af",
      marginTop: "-15px",
      maxWidth: "600px",
    },
    getStartedContainer: {
      marginTop: "40px",
    },
    getStartedButton: {
      padding: "12px 40px",
      fontSize: "1.2rem",
      backgroundColor: isHovered ? "#ffdb70" : "#fef4af",
      color: isHovered ? "#2d4f57" : "#345c66",
      textDecoration: "none",
      border: "2px solid #fef4af",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>Pawtner AI</h1>
      <p style={styles.tagline}>
        Your AI-powered startup assistant for business insights, financial
        guidance, and pitch deck creation.
      </p>
      <div style={styles.getStartedContainer}>
        <a
          href="/chatbot"
          style={styles.getStartedButton}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
