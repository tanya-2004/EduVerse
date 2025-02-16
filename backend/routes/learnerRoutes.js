const express = require("express");
const axios = require("axios");
const Learner = require("../models/Learner");
const router = express.Router();
const mongoose = require("mongoose");

// ✅ Replace this with your actual Gemini API key
const GEMINI_API_KEY = "AIzaSyCq1dI4Tso8AB0PkxP6Yofd1CxK6lK6iEg";

// ✅ Check if Learner Progress Exists
router.get("/check/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Learner.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.json({ exists: !!progress });
  } catch (error) {
    console.error("Error checking progress:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Add Learner Progress
router.post("/add", async (req, res) => {
  try {
    const { userId, quizScore, assignmentScore, attendance } = req.body;

    if (
      !userId ||
      quizScore == null ||
      assignmentScore == null ||
      attendance == null
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const feedback = await generateFeedback(
      quizScore,
      assignmentScore,
      attendance
    );

    const newProgress = new Learner({
      userId: new mongoose.Types.ObjectId(userId), // ✅ Convert to ObjectId
      quizScore,
      assignmentScore,
      attendance,
      feedback,
    });

    await newProgress.save();
    res.status(201).json({ message: "Progress added successfully", feedback });
  } catch (error) {
    console.error("Error adding progress:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get Learner Progress
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Learner.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ AI-Based Feedback Generator (Using Gemini API)
const generateFeedback = async (quizScore, assignmentScore, attendance) => {
  try {
    console.log("generateFeedback function invoked");

    const prompt = `The student's progress is:
      - Quiz Score: ${quizScore}%
      - Assignment Score: ${assignmentScore}%
      - Attendance: ${attendance}%
      
      Provide motivational and constructive feedback.
    `;
    console.log("Prompt sent to API:", prompt);

    const requestPayload = {
      contents: [{ parts: [{ text: prompt }] }],
    };
    console.log("Request Payload:", requestPayload);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      requestPayload,
      { headers: { "Content-Type": "application/json" } }
    );
    
    console.log("Full API Response:", JSON.stringify(response.data, null, 2)); // Printing the entire response

    // Extract feedback from response (this can be adjusted depending on the full content structure)
    const feedback =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Keep going, you're improving!";
    
    console.log("Extracted Feedback:", feedback);

    return feedback;
  } catch (error) {
    console.error("Error generating feedback:", error.message);
    console.error("Full Error:", error.response || error);
    return "Unable to generate feedback at this time.";
  }
};

module.exports = router;