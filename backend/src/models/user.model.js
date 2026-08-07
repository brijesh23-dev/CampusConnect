const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "club", "admin"],
      default: "student",
    },

    interests: [
      {
        type: String,
      },
    ],

    // Club-only profile fields
    description: { type: String, default: "" },
    category:    { type: String, default: "" },
    website:     { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
