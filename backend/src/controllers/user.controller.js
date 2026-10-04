const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");

const updateInterests = async (req, res) => {
  const { interests } = req.body;
  const user = await userModel
    .findByIdAndUpdate(req.user._id, { interests }, { new: true })
    .select("-password");
  res.json({ message: "Interests updated", user });
};

// PUT /api/users/profile — update display name
const updateProfile = async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    throw new ApiError(400, "Name cannot be empty");
  }

  const user = await userModel
    .findByIdAndUpdate(req.user._id, { name: name.trim() }, { new: true })
    .select("-password");
  res.json({ message: "Profile updated", user });
};

// PUT /api/users/password — change password (requires current password)
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Both current and new password are required");
  }
  if (newPassword.length < 6) {
    throw new ApiError(400, "New password must be at least 6 characters");
  }

  const user = await userModel.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await userModel.findByIdAndUpdate(req.user._id, { password: hashed });
  res.json({ message: "Password updated successfully" });
};

module.exports = {
  updateInterests,
  updateProfile,
  changePassword,
};
