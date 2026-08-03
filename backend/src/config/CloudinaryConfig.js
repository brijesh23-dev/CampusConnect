const Cloudinary = require("cloudinary").v2;
const config = require("./config");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
Cloudinary.config({
  cloud_name: config.Cloudinary.CLOUD_NAME|| "campus-connect",
  api_secret: config.Cloudinary.API_SECRET,
  api_key: config.Cloudinary.API_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  params: { 
    folder: "events",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

module.exports = {Cloudinary, storage};