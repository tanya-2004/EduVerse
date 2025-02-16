import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Classroom from "./Classroom";
import Personalization from "./Personalization";
import Resources from "./Resources";
import Profile from "./Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/classroom" element={<Classroom />} />
      <Route path="/personalization" element={<Personalization />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
