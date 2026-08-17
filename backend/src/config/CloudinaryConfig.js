const Cloudinary = require("cloudinary").v2;
const config = require("./config");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

Cloudinary.config({
  cloud_name: config.Cloudinary.CLOUD_NAME || "campus-connect",
  api_secret: config.Cloudinary.API_SECRET,
  api_key: config.Cloudinary.API_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  // Use a function for params — ensures values are always serialized consistently
  // when the signature is computed, preventing "Invalid Signature" errors.
  params: async (req, file) => ({
    folder: "events",
    // Must be a string, NOT an array — Cloudinary signs it as a comma-separated string
    allowed_formats: "jpg,jpeg,png",
    resource_type: "image",
  }),
});

module.exports = { Cloudinary, storage };