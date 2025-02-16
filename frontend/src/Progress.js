import React, { useState, useEffect, useContext, useCallback } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { getProgress } from "./services/progressService";
import "./Progress.css";

const Progress = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user?.id) return;

    try {
      const data = await getProgress(user.id);
      if (!data) throw new Error("Invalid progress data.");
      setProgress(data);

      const feedback = await generateFeedback(
        data.quizScore,
        data.assignmentScore,
        data.attendance
      );
      setProgress((prev) => ({ ...prev, feedback }));
    } catch (error) {
      console.error("Failed to fetch progress:", error);
      toast.error("Error fetching progress.");
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const generateFeedback = async (quizScore, assignmentScore, attendance) => {
    const prompt = `The student's progress is as follows:
- Quiz Score: ${quizScore}%
- Assignment Score: ${assignmentScore}%
- Attendance: ${attendance}%

Provide motivational and constructive feedback in a brief, catchy, and engaging paragraph, incorporating the following:
1. Acknowledge the student's achievements and efforts.
2. Suggest areas for improvement or ways to enhance performance.
3. Motivate the student to continue working hard and staying focused on their goals.`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyCq1dI4Tso8AB0PkxP6Yofd1CxK6lK6iEg`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json" } }
      );
      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Keep going, you're improving!"
      );
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Unable to generate feedback at this time.";
    }
  };

  useEffect(() => {
    if (!user) {
      toast.error("You need to log in.");
      navigate("/profile");
    } else {
      fetchProgress();
    }
  }, [user, navigate, fetchProgress]);

  return (
    <div className="progress-page">
      <div className="progress-header">
        <h2>Your Learning Progress</h2>
      </div>

      {loading ? (
        <p>Loading progress...</p>
      ) : (
        <div className="progress-content">
          {/* Left: Feedback Section */}
          <div className="feedback-card">
            <h3>🔍 AI Feedback</h3>
            <p>
              {progress?.feedback?.trim() ||
                "No feedback available at the moment."}
            </p>
            <div className="score-summary">
              <p>
                📖 Quiz: <b>{progress?.quizScore ?? "N/A"}%</b>
              </p>
              <p>
                📝 Assignment: <b>{progress?.assignmentScore ?? "N/A"}%</b>
              </p>
              <p>
                📅 Attendance: <b>{progress?.attendance ?? "N/A"}%</b>
              </p>
            </div>
          </div>

          {/* Right: Charts Section */}
          <div className="charts-section">
            <Bar
              data={{
                labels: ["Quiz", "Assignment", "Attendance"],
                datasets: [
                  {
                    label: "Performance (%)",
                    data: [
                      progress?.quizScore ?? 0,
                      progress?.assignmentScore ?? 0,
                      progress?.attendance ?? 0,
                    ],
                    backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
                  },
                ],
              }}
              options={{ responsive: true }}
            />

            <Pie
              data={{
                labels: ["Quiz", "Assignment", "Attendance"],
                datasets: [
                  {
                    data: [
                      progress?.quizScore ?? 0,
                      progress?.assignmentScore ?? 0,
                      progress?.attendance ?? 0,
                    ],
                    backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
                  },
                ],
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
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

export default Progress;

// import React, { useState, useEffect, useContext, useCallback } from "react";
// import { toast } from "react-toastify";
// import { AuthContext } from "./context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { getProgress } from "./services/progressService";
// import { Pie, Bar } from "react-chartjs-2";
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import "chart.js/auto";
// import "react-toastify/dist/ReactToastify.css";
// import "./Progress.css";

// const Progress = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [progress, setProgress] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Memoized function to fetch progress
//   const fetchProgress = useCallback(async () => {
//     if (!user?.id) return;

//     try {
//       console.log("Fetching progress for user:", user.id);
//       const data = await getProgress(user.id);
//       console.log("Fetched progress data:", data); // ✅ Debugging log

//       if (!data) throw new Error("Invalid progress data received.");
//       setProgress(data);
//     } catch (error) {
//       console.error("Failed to fetch progress:", error);
//       toast.error("Error fetching progress. Please try again!");
//       setProgress(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.id]);

//   // ✅ Fetch progress when user logs in or changes
//   useEffect(() => {
//     if (!user) {
//       toast.error("You need to log in to view progress.");
//       navigate("/profile");
//       return;
//     }
//     fetchProgress();
//   }, [user, navigate, fetchProgress]);

//   return (
//     <div className="progress-page">
//       {/* Navbar */}
//       <nav className="navbar">
//         <img src="/logo.jpg" alt="EduVerse Logo" className="logo" />
//         <ul className="nav-links">
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/classroom">Classroom</Link>
//           </li>
//           <li>
//             <Link to="/personalization">Personalization</Link>
//           </li>
//           <li>
//             <Link to="/resources">Resources</Link>
//           </li>
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//         </ul>
//       </nav>

//       {/* Main Content */}
//       <div className="progress-container">
//         <h2>Your Learning Progress</h2>

//         {loading ? (
//           <p>Loading progress...</p>
//         ) : progress ? (
//           <>
//             <div className="progress-details">
//               <p>
//                 📖 Quiz Score: <b>{progress?.quizScore ?? "N/A"}%</b>
//               </p>
//               <p>
//                 📝 Assignment Score:{" "}
//                 <b>{progress?.assignmentScore ?? "N/A"}%</b>
//               </p>
//               <p>
//                 📅 Attendance: <b>{progress?.attendance ?? "N/A"}%</b>
//               </p>

//               <div className="ai-feedback">
//                 <h3>🔍 AI Feedback</h3>
//                 <p>
//                   {progress?.feedback &&
//                   progress.feedback !== null &&
//                   progress.feedback.trim() !== ""
//                     ? progress.feedback
//                     : "No feedback available"}
//                 </p>
//               </div>
//             </div>

//             {/* Display Charts Only if Progress Data is Available */}
//             {progress?.quizScore !== undefined &&
//               progress?.assignmentScore !== undefined &&
//               progress?.attendance !== undefined && (
//                 <div className="charts">
//                   <Bar
//                     data={{
//                       labels: ["Quiz Score", "Assignment Score", "Attendance"],
//                       datasets: [
//                         {
//                           label: "Progress (%)",
//                           data: [
//                             progress.quizScore,
//                             progress.assignmentScore,
//                             progress.attendance,
//                           ],
//                           backgroundColor: ["#3b82f6", "#f97316", "#10b981"],
//                         },
//                       ],
//                     }}
//                   />
//                   <Pie
//                     data={{
//                       labels: ["Quiz Score", "Assignment Score", "Attendance"],
//                       datasets: [
//                         {
//                           data: [
//                             progress.quizScore,
//                             progress.assignmentScore,
//                             progress.attendance,
//                           ],
//                           backgroundColor: ["#3b82f6", "#f97316", "#10b981"],
//                         },
//                       ],
//                     }}
//                   />
//                 </div>
//               )}
//           </>
//         ) : (
//           <p>No progress data available.</p>
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="footer-left">
//           <p>Email: support@eduverse.com</p>
//           <p>Phone: +91-9876543210</p>
//         </div>
//         <p className="footer-center">© 2025 EduVerse. All rights reserved.</p>
//         <div className="footer-right">
//           <p>Follow us on:</p>
//           <div className="social-icons">
//             <a
//               href="https://facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaFacebook />
//             </a>
//             <a
//               href="https://twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaTwitter />
//             </a>
//             <a
//               href="https://instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaInstagram />
//             </a>
//             <a
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaLinkedin />
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Progress;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// import './Progress.css';

// import { Bar } from 'react-chartjs-2';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement, // Add this for Pie charts
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register necessary components for the chart
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   ArcElement,  // Register ArcElement for pie chart
//   Title,
//   Tooltip,
//   Legend
// );

// const Progress = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fakeData = {
//       progressHistory: [
//         { quizScore: 85, assignmentScore: 90, attendance: 95, date: "2025-02-14" },
//         { quizScore: 88, assignmentScore: 92, attendance: 97, date: "2025-03-01" }
//       ]
//     };
//     setUserData(fakeData);
//   }, []);

//   const getLatestMetrics = () => {
//     const latestData = userData?.progressHistory[1];
//     const { quizScore, assignmentScore, attendance } = latestData || {};
//     return { quizScore, assignmentScore, attendance };
//   };

//   const generateBarChartData = () => {
//     const { quizScore, assignmentScore, attendance } = getLatestMetrics();
//     return {
//       labels: ['Quiz Score', 'Assignment Score', 'Attendance'],
//       datasets: [{
//         label: 'Metrics',
//         data: [quizScore, assignmentScore, attendance],
//         backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
//       }],
//     };
//   };

//   const generatePieChartData = () => {
//     const { quizScore, assignmentScore, attendance } = getLatestMetrics();
//     return {
//       labels: ['Quiz Score', 'Assignment Score', 'Attendance'],
//       datasets: [{
//         data: [quizScore, assignmentScore, attendance],
//         backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
//       }],
//     };
//   };

//   const getLevel = () => {
//     const { quizScore, assignmentScore, attendance } = getLatestMetrics();
//     const avg = (quizScore + assignmentScore + attendance) / 3;
//     if (avg >= 90) return 'Advanced';
//     if (avg >= 75) return 'Intermediate';
//     return 'Beginner';
//   };

//   const getSuggestions = () => {
//     const level = getLevel();
//     if (level === 'Beginner') {
//       return {
//         comment: 'You are making good progress, but there is room for improvement.',
//         suggestion: 'Focus on improving your quiz scores by practicing more questions.',
//         motivation: 'Keep going, you can do better with consistent effort! 🚀',
//       };
//     }
//     if (level === 'Intermediate') {
//       return {
//         comment: 'You are on the right track!',
//         suggestion: 'Work on revising key concepts for better clarity.',
//         motivation: 'Great job! Keep pushing towards excellence! 💪',
//       };
//     }
//     return {
//       comment: 'Excellent performance, keep up the great work!',
//       suggestion: 'Try challenging yourself with tougher assignments to master your skills.',
//       motivation: 'You are an expert in the making! Keep it up! 🌟',
//     };
//   };

//   const { comment, suggestion, motivation } = getSuggestions();

//   return (
//     <div className="progress-page">
//       <nav className="navbar">
//         <img src="/logo.jpg" alt="EduVerse Logo" className="logo" />
//         <ul className="nav-links">
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/classroom">Classroom</Link></li>
//           <li><Link to="/personalization">Personalization</Link></li>
//           <li><Link to="/resources">Resources</Link></li>
//           <li><Link to="/profile">Profile</Link></li>
//         </ul>
//       </nav>

//       <div className="progress-container">
//         <div className="progress-left">
//           <div className="progress-heading">Your Learning Progress</div>
//           <div className="current-level">Your Current Level: <span>{getLevel()}</span></div>
//           <div className="feedback-box">
//             <p><strong>Feedback:</strong> {comment}</p>
//             <p><strong>Suggestions:</strong> {suggestion}</p>
//             <p><strong>Motivation:</strong> {motivation}</p>
//           </div>
//         </div>

//         <div className="progress-right">
//           <div className="chart-container">
//             <div className="bar-chart">
//               <Bar data={generateBarChartData()} options={{ responsive: true }} />
//             </div>
//             <div className="pie-chart">
//               <Pie data={generatePieChartData()} options={{ responsive: true }} />
//             </div>
//           </div>
//         </div>
//       </div>
// {/* Footer */}
//       <footer className="footer">
//               <div className="footer-left">
//                 <p>Email: support@eduverse.com</p>
//                 <p>Phone: +91-9876543210</p>
//               </div>
//               <p className="footer-center">© 2025 EduVerse. All rights reserved.</p>
//               <div className="footer-right">
//                 <p>Follow us on:</p>
//                 <div className="social-icons">
//                   <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
//                   <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
//                   <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
//                   <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
//                 </div>
//               </div>
//             </footer>
//     </div>
//   );
// };

// export default Progress;
