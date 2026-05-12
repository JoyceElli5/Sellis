const mongoose = require("mongoose");

let cached = null;

async function connectDatabase() {
  if (cached && mongoose.connection.readyState === 1) return cached;

  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/sellis";
  cached = await mongoose.connect(uri, { autoIndex: true });
  console.log("Connected to MongoDB");
  return cached;
}

module.exports = { connectDatabase };
