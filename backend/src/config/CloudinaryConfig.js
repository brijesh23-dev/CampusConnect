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
  params: async (req, file) => ({
    folder: "events",
    resource_type: "image",
    // NOTE: Do NOT add allowed_formats here — it causes "Invalid Signature"
    // because multer-storage-cloudinary and the Cloudinary SDK disagree on
    // how to serialize arrays/strings when computing the HMAC signature.
    // File-type validation is handled by multer's fileFilter in the routes.
  }),
});

module.exports = { Cloudinary, storage };