import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Startup Dashboard</h1>
      <p style={styles.description}>
        Your AI-powered startup assistant for business insights, financial guidance, and pitch deck creation.
      </p>
      <a href="/chatbot" style={styles.button}>Get Started →</a>
    </div>
  );
}

const styles = {
  container: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#ffffff",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1.2rem",
    maxWidth: "600px",
    marginTop: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "5px",
    textDecoration: "none",
    transition: "0.3s",
  }
};

export default Home;
