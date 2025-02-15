import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Chatbot from "./pages/Chatbot";  
import News from "./pages/News";  

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/news" element={<News/>} />
      </Routes>
    </Router>
  );
}


export default App;
