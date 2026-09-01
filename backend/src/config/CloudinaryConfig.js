const Cloudinary = require("cloudinary").v2;
const config = require("./config");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudName = config.Cloudinary.CLOUD_NAME;
const apiKey = config.Cloudinary.API_KEY;
const apiSecret = config.Cloudinary.API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env before uploading images.",
  );
}

Cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  params: async (req, file) => ({
    folder: "events",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
  }),
});

module.exports = { Cloudinary, storage };
