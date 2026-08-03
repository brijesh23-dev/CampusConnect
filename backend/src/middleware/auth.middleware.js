const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/config");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");  //added user to req for future use in controllers

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const authorizeRoles = (...roles) => {    //spread operator to accept multiple roles and return a middleware function that checks if the user's role is in the allowed roles
  return (req, res, next)=>{
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user.role}) is not allowed`,
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
