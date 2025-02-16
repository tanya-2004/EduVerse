require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const summarizeRoute = require('./routes/summarizerRoute');
const authRoutes = require("./routes/authRoutes");
const learnerRoutes = require("./routes/learnerRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Manually define MongoDB URI & JWT_SECRET
const MONGO_URI =
  "mongodb+srv://tanya2004agrawal:nq7DwtRUMZngZWBC@cluster0.pnnpg.mongodb.net/";
const PORT = 5000;

// MongoDB Connection (No deprecated options)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use('/api', summarizeRoute);
app.use("/auth", authRoutes);
app.use("/api/learners", learnerRoutes);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
