import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // ✅ Check this path
import Home from "./pages/Home";  // ✅ Check this path
import Chatbot from "./pages/Chatbot";  // ✅ Check this path

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}


export default App;
