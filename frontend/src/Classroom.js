import React, { useState, useRef } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Classroom.css";

const Classroom = () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadedClasses, setUploadedClasses] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  // Ref for dialog box to detect clicks outside
  const dialogRef = useRef(null);

  const handleUpload = () => {
    const subject = document.getElementById("subject").value.trim();
    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value;
    const recordingFile = document.getElementById("recording").files[0];
    const summaryFile = document.getElementById("summary").files[0];

    if (!subject || !title || !date || !recordingFile || !summaryFile) {
      alert("Upload Failed, Retry - All fields are required.");
      return;
    }

    // Simulate successful upload
    const newClass = {
      subject,
      title,
      date: new Date().toISOString().split("T")[0],
      recording: URL.createObjectURL(recordingFile), // Simulated video URL
      summary: URL.createObjectURL(summaryFile),    // Simulated summary file URL
    };

    setUploadStatus("Uploading...");
    setTimeout(() => {
      setUploadedClasses([newClass, ...uploadedClasses]);
      setUploadStatus("Uploaded Successfully!");
      alert("Uploaded Successfully!");
      setShowUploadDialog(false); // Close dialog on success
    }, 1000);
  };

  // Close dialog on clicking outside
  const handleOutsideClick = (event) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setShowUploadDialog(false);
    }
  };

  // Search functionality
  const handleSearch = () => {
    const lowerQuery = searchQuery.toLowerCase().trim();
    const foundIndex = uploadedClasses.findIndex(
      (cls) =>
        cls.subject.toLowerCase().includes(lowerQuery) ||
        cls.title.toLowerCase().includes(lowerQuery)
    );

    if (foundIndex !== -1) {
      setHighlightedIndex(foundIndex);
    } else {
      alert("Class not found.");
      setHighlightedIndex(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="classroom-page">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.jpg" alt="EduVerse Logo" className="logo" />
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="/classroom">Classroom</a></li>
          <li><Link to="/personalization">Personalization</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </nav>

      <div className="content">
        <h2 className="live-classes-heading">Live Classes and Recordings</h2>

        {/* Join Live Class */}
        <button className="join-live-btn" onClick={() => window.open("https://meet.google.com/ueh-pkig-kai", "_blank")}>
          Join Live Class
        </button>

        {/* Search + Upload Section */}
        <div className="search-upload-container">
          <input
            type="text"
            placeholder="Search by subject or title"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>

          <button className="upload-btn" onClick={() => setShowUploadDialog(true)}>Upload Class</button>
        </div>

        {/* Upload Dialog */}
        {showUploadDialog && (
          <div ref={dialogRef} className="upload-dialog">
            <h3>Upload New Class</h3>
            <input id="subject" type="text" placeholder="Subject Name" />
            <input id="title" type="text" placeholder="Class Title" />
            <input id="date" type="date" />
            <input id="recording" type="file" accept="video/mp4" />
            <input id="summary" type="file" accept=".pdf,.docx,.pptx" />
            <button onClick={handleUpload}>Upload</button>
          </div>
        )}

        {/* Display Uploaded Classes */}
        <div className="class-table">
          {uploadedClasses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((classItem, index) => (
              <div
                key={index}
                className={`class-entry ${highlightedIndex === index ? "highlighted" : ""}`}
              >
                <div className="class-header">
                  <h3>{classItem.subject} - {classItem.title}</h3>
                  <p className="date">{classItem.date}</p>
                </div>
                <div className="class-actions">
                  <button className="view-recording">View Recording</button>
                  <button className="view-summary">View Summary</button>
                </div>
              </div>
            ))}

          {/* Fake Entries (Keep as requested) */}
          <div className="class-entry">
            <div className="class-header">
              <h3>Mathematics - Calculus Basics</h3>
              <p className="date">2025-02-07</p>
            </div>
            <div className="class-actions">
              <button className="view-recording">View Recording</button>
              <button className="view-summary">View Summary</button>
            </div>
          </div>

          <div className="class-entry">
            <div className="class-header">
              <h3>Physics - Quantum Mechanics</h3>
              <p className="date">2025-02-05</p>
            </div>
            <div className="class-actions">
              <button className="view-recording">View Recording</button>
              <button className="view-summary">View Summary</button>
            </div>
          </div>

          <div className="class-entry">
            <div className="class-header">
              <h3>Chemistry - Organic Reactions</h3>
              <p className="date">2025-02-03</p>
            </div>
            <div className="class-actions">
              <button className="view-recording">View Recording</button>
              <button className="view-summary">View Summary</button>
            </div>
          </div>
        </div>
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

export default Classroom;