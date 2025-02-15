import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const styles = {
    navbar: {
      background: "#333",
      padding: "10px",
    },
    navList: {
      display: "flex",
      listStyle: "none",
      gap: "20px",
      padding: 0,
      margin: 0,
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
    },
    navLinkHover: {
      color: "#f0a500",
    },
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link to="/chatbot" style={styles.navLink}>Chatbot</Link>
        </li>
        <li>
          <Link to="/financial" style={styles.navLink}>Financial Advice</Link>
        </li>
        <li>
          <Link to="/technology" style={styles.navLink}>Important News</Link>
        </li>
        <li>
          <Link to="/legal" style={styles.navLink}>Profile</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
