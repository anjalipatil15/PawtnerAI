import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Chatbot from "./pages/Chatbot";  
import News from "./pages/News";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/news" element={<News/>} />
        <Route path="/" element={<Home />} />
        <Route path="/sign-up-/-log-in" element={<Registration />} />
        </Routes>
        
      <Footer />

    </Router>
  );
}


export default App;
