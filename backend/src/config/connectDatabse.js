const config = require('./config');
require('dotenv').config();
const mongoose = require('mongoose');

const connectDatabase = async () => {
    await mongoose.connect(config.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    })
}

module.exports = connectDatabase;