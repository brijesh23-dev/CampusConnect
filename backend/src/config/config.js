const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/campusconnect",
  JWT_SECRET: process.env.JWT_SECRET || "dev_jwt_secret_change_me",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",

  Cloudinary: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
    API_KEY: process.env.CLOUDINARY_API_KEY || "",
    API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  },
};

config.isProduction = config.NODE_ENV === "production";

config.validateProductionConfig = () => {
  if (!config.isProduction) return;

  const missing = [];
  if (!config.JWT_SECRET || config.JWT_SECRET === "dev_jwt_secret_change_me") {
    missing.push("JWT_SECRET");
  }
  if (!config.DB_URI) {
    missing.push("DB_URI");
  }
  if (!config.FRONTEND_URL || !/^https:\/\//i.test(config.FRONTEND_URL)) {
    missing.push("FRONTEND_URL (must use https in production)");
  }

  if (missing.length) {
    throw new Error(
      `Production config is incomplete. Missing or invalid: ${missing.join(", ")}.`
    );
  }
};

module.exports = config;