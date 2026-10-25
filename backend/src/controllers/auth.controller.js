const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const ApiError = require("../utils/ApiError.js");
const isProd = process.env.NODE_ENV === "production";
const DEFAULT_SESSION_DURATION = "7d";
const REMEMBERED_SESSION_DURATION = "30d";
const REMEMBERED_COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;

const generateToken = (
  userId,
  role,
  sessionVersion,
  expiresIn = DEFAULT_SESSION_DURATION,
) => {
  return jwt.sign(
    { id: userId, role, sessionVersion },
    config.JWT_SECRET,
    { expiresIn },
  );
};

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user._id, user.role, user.sessionVersion);
  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      interests: user.interests,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password, rememberMe = false } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Incorrect password.");
  }

  const expiresIn = rememberMe
    ? REMEMBERED_SESSION_DURATION
    : DEFAULT_SESSION_DURATION;
  const sessionCookieOptions = rememberMe
    ? { ...cookieOptions, maxAge: REMEMBERED_COOKIE_MAX_AGE }
    : cookieOptions;
  const activeSession = await UserModel.findByIdAndUpdate(
    user._id,
    { $inc: { sessionVersion: 1 } },
    { returnDocument: "after" },
  );

  if (!activeSession) {
    throw new ApiError(401, "Invalid credentials.");
  }

  const token = generateToken(
    activeSession._id,
    activeSession.role,
    activeSession.sessionVersion,
    expiresIn,
  );
  res.cookie("token", token, sessionCookieOptions);
  res.status(200).json({
    message: "Login successful",
    user: {
      id: activeSession._id,
      name: activeSession.name,
      email: activeSession.email,
      role: activeSession.role,
      interests: activeSession.interests,
    },
    token,
  });
};

const getMe = async (req, res) => {
  res.json({
    user: req.user,
  });
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  res.json({ message: "Logout successful" });
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
