const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true, required: [true, "Please add a email"] },
  password: { type: String, required: true[(true, "Please add a password ")] },
  token: { type: String },
});

module.exports = mongoose.model("user", userSchema);
