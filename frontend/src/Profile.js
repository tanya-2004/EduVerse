import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { signup, login } from "./services/authService";
import { toast } from "react-toastify";
import "./Profile.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Profile = () => {
  const { user, loginUser, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [userType, setUserType] = useState(""); // "student" or "teacher"

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    rollNumber: "",
    batch: "",
  });

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Toggle between Sign Up and Sign In
  const handleToggle = () => {
    setIsSignup(!isSignup);
    setUserType(""); // Reset user type
  };

  // Handle Signup/Login Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup({ ...formData, role: userType });
        toast.success("Sign Up Successful!");
        setIsSignup(false);
      } else {
        const userData = await login({
          email: formData.email,
          password: formData.password,
        });
        loginUser(userData);
        toast.success("Logged in successfully!");
        setTimeout(() => navigate("/"), 100); // Ensure navigation happens smoothly
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-content">
        {/* Navigation Bar */}
        <nav className="navbar">
          <img src="/logo.jpg" alt="EduVerse Logo" className="logo" />
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/classroom">Classroom</Link>
            </li>
            <li>
              <Link to="/personalization">Personalization</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        {/* Heading */}
        <h2 className="profile-heading">
          Join EduVerse - Unlock Your Learning Potential
        </h2>

        {/* Profile Section */}
        {user ? (
          <div className="profile-details">
            <h2>Welcome, {user.name}</h2>
            <button className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-form">
            <h2>{isSignup ? `Sign Up as ${userType || "..."}` : "Sign In"}</h2>

            {/* Signup Role Selection */}
            {isSignup && !userType && (
              <div className="profile-options-wrapper">
                <div className="profile-box">
                  <div className="profile-option student">
                    <h3>As Student</h3>
                    <button
                      className="signup-btn"
                      onClick={() => setUserType("student")}
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="profile-option teacher">
                    <h3>As Teacher</h3>
                    <button
                      className="signup-btn"
                      onClick={() => setUserType("teacher")}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Signup & Signin Forms */}
            {(userType || !isSignup) && (
              <form onSubmit={handleSubmit}>
                {isSignup && (
                  <>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      required
                      onChange={handleChange}
                    />
                  </>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                />

                {/* Student Fields */}
                {isSignup && userType === "student" && (
                  <>
                    <input
                      type="text"
                      name="rollNumber"
                      placeholder="Roll Number"
                      required
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="batch"
                      placeholder="Batch (e.g. 2023-2027)"
                      required
                      onChange={handleChange}
                    />
                  </>
                )}

                <button type="submit" className="submit-btn">
                  {isSignup ? "Register" : "Login"}
                </button>
              </form>
            )}

            <button onClick={handleToggle} className="toggle-btn">
              {isSignup
                ? "Already have an account? Sign In"
                : "New User? Sign Up"}
            </button>
          </div>
        )}
      </div>

      {/* Footer (always visible) */}
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

export default Profile;
