const notificationModel = require("../models/notification.model");
const eventModel = require("../models/event.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;
    const user = await userModel
      .findByIdAndUpdate(req.user._id, { interests }, { new: true })
      .select("-password");
    res.json({ message: "Interests updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/profile — update display name
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name cannot be empty" });
    }
    const user = await userModel
      .findByIdAndUpdate(req.user._id, { name: name.trim() }, { new: true })
      .select("-password");
    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/password — change password (requires current password)
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Both current and new password are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await userModel.findById(req.user._id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(req.user._id, { password: hashed });
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateInterests,
  updateProfile,
  changePassword,
};
