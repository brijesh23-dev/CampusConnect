const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer")
    ? req.headers.authorization.split(" ")[1]
    : req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Not authorized, no token");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, config.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Not authorized, token failed");
  }

  req.user = await User.findById(decoded.id).select("-password");

  if (!req.user) {
    throw new ApiError(401, "User not found");
  }
  next();
});

const authorizeRoles = (...roles) => {    //spread operator to accept multiple roles and return a middleware function that checks if the user's role is in the allowed roles
  return (req, res, next)=>{
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, `Role (${req.user.role}) is not allowed`);
    }

    next();
  };
};

module.exports = {
  protect,
  authorizeRoles,
};
