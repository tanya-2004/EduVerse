import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [userType, setUserType] = useState(""); // 'student' or 'teacher'
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    batch: "",
  });

  const handleSignupClick = (type) => {
    setUserType(type);
    setShowSignup(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Details:", formData);
    setShowSignup(false);
  };

  return (
    <div className="profile-page">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.jpg" alt="EduVerse Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/classroom">Classroom</Link></li>
          <li><Link to="/personalization">Personalization</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      {/* Heading */}
      <h2 className="profile-heading">Join EduVerse - Unlock Your Learning Potential</h2>

      {/* Login Box */}
      <div className="profile-box">
        <div className="profile-option student">
          <h3>As Student</h3>
          <button className="signup-btn" onClick={() => handleSignupClick("student")}>Sign Up</button>
          <button className="signin-btn">Sign In</button>
        </div>
        <div className="profile-option teacher">
          <h3>As Teacher</h3>
          <button className="signup-btn" onClick={() => handleSignupClick("teacher")}>Sign Up</button>
          <button className="signin-btn">Sign In</button>
        </div>
      </div>

      {/* Signup Dialog */}
      {showSignup && (
        <div className="signup-modal">
          <div className="signup-content">
            <h3>Sign Up as {userType === "student" ? "Student" : "Teacher"}</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
              <input type="text" name="rollNumber" placeholder="Roll Number" required onChange={handleChange} />
              <input type="text" name="batch" placeholder="Batch (e.g. 2023-2027)" required onChange={handleChange} />
              <button type="submit" className="submit-btn">Register</button>
            </form>
            <button className="close-btn" onClick={() => setShowSignup(false)}>Close</button>
          </div>
        </div>
      )}



      {/* Footer */}
            <footer className="footer">
              <div className="footer-left">
                <p>Email: support@eduverse.com</p>
                <p>Phone: +91-9876543210</p>
              </div>
              <p className="footer-center">© 2025 EduVerse. All rights reserved.</p>
              <div className="footer-right">
                <p>Follow us on:</p>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
              </div>
            </footer>
          </div>
  );
};

export default Profile;
