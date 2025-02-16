import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./LandingPage.css";

const LandingPage = () => {
  const [displayText, setDisplayText] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTimetable, setShowTimetable] = useState(false);
  const calendarRef = useRef(null);

  const phrases = ["Redefining Learning", "Smarter with AI, Deeper with VR"];

  useEffect(() => {
    let currentText = "";
    let phraseIndex = 0;
    let wordIndex = 0;

    const typeEffect = setInterval(() => {
      if (wordIndex < phrases[phraseIndex].split(" ").length) {
        currentText += phrases[phraseIndex].split(" ")[wordIndex] + " ";
        setDisplayText(currentText);
        wordIndex++;
      } else {
        if (phraseIndex === 0) {
          phraseIndex = 1;
          wordIndex = 0;
          currentText += "\n";
        } else {
          clearInterval(typeEffect);
        }
      }
    }, 300);

    return () => clearInterval(typeEffect);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar]);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src =
      "https://files.bpcontent.cloud/2025/02/11/23/20250211233252-8CBLPGZR.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const handleScheduleClick = () => {
    setShowCalendar(true);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowTimetable(true);
  };

  const closeTimetable = () => setShowTimetable(false);

  return (
    <div className="landing-page">
      <nav className="navbar">
        <img src="/logo.jpg" alt="EduVerse Logo" className="logo" />
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="/classroom">Classroom</a>
          </li>
          <li>
            <a href="/personalization">Personalization</a>
          </li>
          <li>
            <a href="/resources">Resources</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>

      <div className="hero">
        <div className="hero-text">
          <h1>{displayText}</h1>
        </div>
        <div className="animated-bg">
          <img src="/bg.jpg" alt="Background" />
        </div>
        <button className="schedule-btn" onClick={handleScheduleClick}>
          View Schedule
        </button>
      </div>

      {showCalendar && (
        <div className="calendar-popup" ref={calendarRef}>
          <Calendar onClickDay={handleDateClick} value={new Date()} />
        </div>
      )}

      {showTimetable && (
        <div className="timetable-dialog">
          <h3>Timetable for {selectedDate.toDateString()}</h3>
          <ul>
            <li>
              <span className="time">09:00 AM</span>{" "}
              <span className="subject">Math Class</span>
            </li>
            <li>
              <span className="time">11:00 AM</span>{" "}
              <span className="subject">Physics Lecture</span>
            </li>
            <li>
              <span className="time">01:00 PM</span>{" "}
              <span className="subject">AI Workshop</span>
            </li>
            <li>
              <span className="time">03:00 PM</span>{" "}
              <span className="subject">VR Lab</span>
            </li>
          </ul>
          <button onClick={closeTimetable} className="close-btn">
            Close
          </button>
        </div>
      )}

      <div id="about" className="about-section">
        <img src="/about.jpg" alt="About EduVerse" className="about-image" />
        <div className="about-text">
          <h2>About EduVerse</h2>
          <br />
          <p>
            EduVerse is an innovative learning platform that combines the power
            of <b>Artificial Intelligence (AI) and Virtual Reality (VR)</b> to
            provide a truly immersive educational experience. Our platform
            offers <b>personalized learning paths</b> powered by AI, adaptive to
            each student's unique needs. With hands-on{" "}
            <b>VR-based classrooms</b>, learners can experience practical
            education like never before. Whether you're a student looking to
            enhance your skills or an educator seeking new ways to engage,
            EduVerse transforms the way knowledge is shared and absorbed.
            Redefining learning for the future, we make education smarter,
            deeper and more <b>accessible for everyone.</b>
          </p>
        </div>
      </div>

      <h2 className="services-title">Services We Offer</h2>
      <div className="services-section">
        <Link
          to="/classroom"
          className="service-box"
          style={{ backgroundImage: "url('/classroom.jpg')" }}
        >
          <h3>Classroom</h3>
          <div className="explore-overlay">Explore</div>
        </Link>
        <Link
          to="/personalization"
          className="service-box"
          style={{ backgroundImage: "url('/personalization.jpg')" }}
        >
          <h3>Personalization</h3>
          <div className="explore-overlay">Explore</div>
        </Link>
        <Link
          to="/resources"
          className="service-box"
          style={{ backgroundImage: "url('/resources.jpg')" }}
        >
          <h3>Resources</h3>
          <div className="explore-overlay">Explore</div>
        </Link>
      </div>

      <footer className="footer">
        <div className="footer-left">
          <p>Email: support@eduverse.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
        <p className="footer-center">© 2025 EduVerse. All rights reserved.</p>
        <div className="footer-right">
          <p>Follow us on:</p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
