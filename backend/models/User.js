const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true, index: true },
  email: { type: String, required: true, unique: true, trim: true, index: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "teacher"] },
  rollNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function () {
        return this.role === "student" ? !!this.rollNumber : true;
      },
      message: "Roll number is required for students.",
    },
  },
  batch: {
    type: String,
    trim: true,
    validate: {
      validator: function () {
        return this.role === "student" ? !!this.batch : true;
      },
      message: "Batch is required for students.",
    },
  },
});

module.exports = mongoose.model("User", UserSchema);