const mongoose = require("mongoose");

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
};

module.exports = clearDatabase;