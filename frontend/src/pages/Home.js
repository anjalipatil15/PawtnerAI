import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  
  // Remove default body margin and padding
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
  }, []);

  // State to handle hover effect for underlines
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.pageContainer}>
      {/* Large Logo at the Top */}
      <h1 style={styles.logo}>
        Pawtner AI
      </h1>

      {/* Tagline Just Below Pawtner AI to the Right */}
      <p style={styles.tagline}>
        Your AI-powered startup assistant for business insights, financial guidance, and pitch deck creation.
      </p>

      <div style={styles.getStartedContainer}>
        <Link 
          to="/get-started" 
          style={styles.getStartedButton}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#fef4af";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#fef4af";
            e.target.style.color = "#345c66";
          }}
        >
          Get Started
        </Link>
      </div>

      {/* Navigation Links */}
      <div style={styles.navigationContainer}>
        <div style={styles.navigationMenu}>
          {["Home", "News", "Validation Bot", "Profile", "Sign Up / Log in"].map((item, index) => (
            <Link 
              key={index} 
              to={`/${item.toLowerCase().replace(/\s+/g, "-")}`} 
              style={styles.navLink} 
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item}
              <span 
                style={{
                  ...styles.underline, 
                  width: hoveredIndex === index ? "100%" : "0%"
                }}
              ></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.footerLine}></div>
        <p style={styles.footerText}>
          Made with ❤️ by Meow 

        </p>
      </footer>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#345c66",
    height: "100vh",
    width: "100%",
    margin: "0",
    padding: "0",
    position: "relative",
    fontFamily: "'Arial', sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    color: "#fef4af",
    alignItems: "center",
    overflow: "hidden",
  },
  logo: {
    fontSize: "10.5rem",
    fontWeight: "bold",
    color: "#fef4af",
    marginTop: "15px",
    lineHeight: "1",
    width: "100%",
    textAlign: "right",
    paddingRight: "50px",
    fontFamily: "'Montserrat', sans-serif", // Updated to Montserrat


  },
  tagline: {
    fontSize: "1rem", 
    color: "#fef4af",
    textAlign: "right",
    paddingLeft: "600px",
    paddingRight: "10px",
    marginTop: "-80px",
    marginRight: "35px",
    fontWeight: "",
  },
  navigationContainer: {
    position: "absolute",
    bottom: "105px",
    left: "100px",
  },
  navigationMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
  },
  getStartedContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    paddingRight: "10px",
    marginTop: "10px",
  },
  getStartedButton: {
    display: "inline-block",
    padding: "10px 145px",
    fontSize: "1.2rem",
    backgroundColor: "#fef4af",
    color: "#345c66",
    textDecoration: "none",
    border: "2px solid #fef4af", 
    borderRadius: "10px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, color 0.3s ease",
    cursor: "pointer",
    marginTop: "140px",
    marginRight: "35px",
  },
  navLink: {
    color: "#fef4af",
    textDecoration: "none",
    fontSize: "1rem",
    display: "inline-block",
    position: "relative",
    paddingBottom: "5px",
    overflow: "hidden",
  },
  underline: {
    display: "block",
    height: "2px",
    backgroundColor: "#fef4af",
    transition: "width 0.3s ease",
    position: "absolute",
    bottom: "0",
    left: "0",
  },
  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    textAlign: "center",
    padding: "10px 0",
    backgroundColor: "#345c66",
  },
  footerLine: {
    width: "100%",
    height: "2px",
    backgroundColor: "#f3e5ab", // Vanilla-colored line
    margin: "0 auto",
  },
  footerText: {
    color: "#fef4af",
    marginTop: "10px",
    fontSize: "0.9rem",
  }
};

export default Home;
