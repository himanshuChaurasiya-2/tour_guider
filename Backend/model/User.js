const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String },
    address: { type: String },
    places: { type: String },
    language: { type: String },
    profileImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
