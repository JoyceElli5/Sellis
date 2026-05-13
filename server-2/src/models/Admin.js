const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, default: "ADMIN" },
  },
  { timestamps: true, collection: "admins" }
);

module.exports = mongoose.model("Admin", adminSchema);
