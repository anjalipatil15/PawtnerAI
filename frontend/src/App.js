import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Chatbot from "./pages/Chatbot";  
import News from "./pages/News";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/news" element={<News/>} />
        </Routes>
        
      <Footer />

    </Router>
  );
}


export default App;
