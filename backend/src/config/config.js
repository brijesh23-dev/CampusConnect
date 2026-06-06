const config = {
    PORT: process.env.PORT ,
    DB_URI: process.env.DB_URI ,
    JWT_SECRET: process.env.JWT_SECRET ,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS) ,
    
    Cloudinary: {
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
}
module.exports = config;