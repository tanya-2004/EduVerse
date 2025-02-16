
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Resources.css";

const subjects = [
  { name: "Mathematics" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Computer Science" },
  { name: "English" },
];

const Resources = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleExploreClick = (subject) => {
    setSelectedSubject(selectedSubject === subject ? null : subject);
  };

  return (
    <div className="resources-page">
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
      <h1 className="resources-heading">Tests, Books, PYQs</h1>

      {/* Subject Boxes */}
      <div className="resources-grid">
        {subjects.map((subject, index) => (
          <div key={index} className="resource-box">
            <h3>{subject.name}</h3>
            <div className="explore-overlay">
              <button className="explore-btn" onClick={() => handleExploreClick(subject.name)}>
                Explore
              </button>
            </div>
            {selectedSubject === subject.name && (
              <div className="resource-options">
                <Link to={`/${subject.name.toLowerCase()}/tests`} className="resource-btn">Tests</Link>
                <Link to={`/${subject.name.toLowerCase()}/books`} className="resource-btn">Books</Link>
                <Link to={`/${subject.name.toLowerCase()}/pyqs`} className="resource-btn">PYQs</Link>
              </div>
            )}
          </div>
        ))}
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

export default Resources;
