import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Chatbot from "./pages/Chatbot";  
import News from "./pages/News";  
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import StrategicBusinessAdvisor from "./pages/StrategicBusinessAdvisor";
import IdeaValidation from "./pages/IdeaValidation";
import ProfilePage from "./pages/ProfilePage";

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
        <Route path="/strategic-business-advisor" element={<StrategicBusinessAdvisor />} />
        <Route path="/validation-bot" element={<IdeaValidation />} />
        <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        
      <Footer />

    </Router>
  );
}


export default App;
