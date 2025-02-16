import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage";
import Classroom from "./Classroom";
import Personalization from "./Personalization";
import Resources from "./Resources";
import Profile from "./Profile";
import Progress from "./Progress";
import Summarizer from "./Summarizer";  
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/personalization" element={<Personalization />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/summarizer" element={<Summarizer />} /> 
      </Routes>
    </AuthProvider>
  );
}

export default App;