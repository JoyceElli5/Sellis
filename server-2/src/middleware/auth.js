const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/ApiResponse");

const SECRET = () =>
  Buffer.from(
    process.env.JWT_SECRET ||
      "c2VsbGlzLXNhbG9uLXNlY3JldC1rZXktZm9yLWp3dC10b2tlbi1nZW5lcmF0aW9uLW11c3QtYmUtYXQtbGVhc3QtMjU2LWJpdHM=",
    "base64"
  );

function generateToken(email, role) {
  return jwt.sign({ sub: email, role }, SECRET(), { expiresIn: "24h" });
}

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json(ApiResponse.error("Unauthorized"));
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, SECRET());
    req.user = { email: decoded.sub, role: decoded.role };
    next();
  } catch {
    return res.status(401).json(ApiResponse.error("Invalid or expired token"));
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "ADMIN") {
    return res.status(403).json(ApiResponse.error("Access denied"));
  }
  next();
}

module.exports = { generateToken, authenticate, requireAdmin };
