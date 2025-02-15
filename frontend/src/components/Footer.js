import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      position: "fixed",
      bottom: "0",
      left: "0",
      width: "100%",
      textAlign: "center",
      padding: "15px 0",
      backgroundColor: "#345c66",
      color: "#fef4af",
      fontSize: "1rem",
      fontWeight: "bold",
    },
    footerLine: {
      width: "80%",
      height: "2px",
      backgroundColor: "#fef4af",
      margin: "0 auto 10px",
    },
    footerText: {
      margin: "0",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerLine}></div>
      <p style={styles.footerText}>Made with ❤️ by Meow</p>
    </footer>
  );
};

export default Footer;
