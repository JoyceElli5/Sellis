const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { generateToken } = require("../middleware/auth");

async function login(email, password) {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) {
    const err = new Error("Invalid email or password");
    err.status = 401;
    throw err;
  }

  const token = generateToken(admin.email, admin.role);
  return { token, email: admin.email, name: admin.name, role: admin.role };
}

module.exports = { login };
