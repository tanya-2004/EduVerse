const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizScore: { type: Number, required: true },
  assignmentScore: { type: Number, required: true },
  attendance: { type: Number, required: true }, // Percentage (0-100)
  feedback: { type: String, default: "" }, // AI-generated feedback
});

const Learner = mongoose.model("Learner", learnerSchema);
module.exports = Learner;