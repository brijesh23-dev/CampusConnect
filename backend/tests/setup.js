require("dotenv").config({
  path: ".env.test",
});

const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(" connected to Test mongodb");
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log("Test mongodb connection closed")
});