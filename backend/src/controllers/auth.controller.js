const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, config.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    const token = generateToken(user._id, user.role);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        interests: user.interests,
      },
      token ,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({
    user: req.user,
  });
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logout successful" });
};

module.exports = {
  register,
  login,
  getMe,
  logout,
};
