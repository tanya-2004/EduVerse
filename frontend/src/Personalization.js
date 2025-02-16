import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Personalization.css";

const Personalization = () => {
  const [loading, setLoading] = useState(false);

  const handleStartTest = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/progress-test"; // Redirect after loading
    }, 2000);
  };

  return (
    <div className="personalization-page">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.jpg" alt="EduVerse Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><Link to="/classroom">Classroom</Link></li>
          <li><Link to="/personalization">Personalization</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      {/* Heading */}
      <h2 className="personalization-heading">Track Your Learning Journey</h2>

      {/* Centered Box */}
      <div className="personalization-box">
        <div className="instruction-box">
          <p className="instructions">
            - Recommended every 2nd week <br /><br />
            - Based on 3 key metrics: Quiz Score, Concept Understanding, and Time Efficiency <br /><br />
            - Analyzes your strengths & improvement areas, helping you progress faster! 🚀
          </p>
        </div>
        <button className="start-btn" onClick={handleStartTest}>
          {loading ? "Loading..." : "Start Progress Test"}
        </button>
      </div>

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

export default Personalization;