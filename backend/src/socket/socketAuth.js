const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/user.model");

const socketAuth = async (socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.query?.token ||
      (() => {
        const cookieHeader = socket.handshake.headers.cookie || "";
        const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
        return match ? match[1] : null;
      })();

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(
      token,
      config.JWT_SECRET || process.env.JWT_SECRET,
    );

    const user = await User.findById(decoded.id || decoded._id || decoded.userId)
      .select("sessionVersion");

    if (
      !user ||
      (decoded.sessionVersion ?? 0) !== (user.sessionVersion ?? 0)
    ) {
      return next(new Error("Invalid or expired token"));
    }

    socket.data.userId = decoded.id || decoded._id || decoded.userId;
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
};


module.exports = socketAuth;