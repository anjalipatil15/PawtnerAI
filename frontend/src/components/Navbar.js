import React, { useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  navbar: {
    position: "fixed",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    fontSize: "1rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#fef4af",
    fontWeight: "bold",
    position: "relative",
    padding: "5px 0",
    transition: "color 0.3s ease",
  },
  underline: {
    position: "absolute",
    bottom: "-2px",
    left: "0",
    width: "0%",
    height: "2px",
    backgroundColor: "#fef4af",
    transition: "width 0.3s ease",
  },
};

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = ["Home", "News", "Validation Bot", "Profile", "Sign Up / Log in"];

  return (
    <nav style={styles.navbar}>
      {navItems.map((item, index) => (
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
              width: hoveredIndex === index ? "100%" : "0%",
            }}
          ></span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;