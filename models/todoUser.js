const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    todos: { type: [] },
  },
  { timestamps: true, collection: "User" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
