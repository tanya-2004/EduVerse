const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET =
  "276c2e89a17b8eec87eacfff0f927db8e9db263c50966a4a7a747bf8b227a2d472c4d54af88118a0e54b8a459d79b63dd2ebbee3c13f1e6594d64b898c46fb4c";

// ✅ Signup Route (Supports Both Student & Teacher)
router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password, role, rollNumber, batch } =
      req.body;

    if (!["student", "teacher"].includes(role)) {
      return res
        .status(400)
        .json({ message: "Invalid role. Choose 'student' or 'teacher'." });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
      rollNumber: role === "student" ? rollNumber : undefined,
      batch: role === "student" ? batch : undefined,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Login Route (Common for Both)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
