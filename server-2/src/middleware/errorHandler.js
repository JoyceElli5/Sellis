const ApiResponse = require("../utils/ApiResponse");

function errorHandler(err, req, res, _next) {
  if (err.status === 404) {
    return res.status(404).json(ApiResponse.error(err.message));
  }
  if (err.status === 400) {
    return res.status(400).json(ApiResponse.error(err.message));
  }
  if (err.status === 401) {
    return res.status(401).json(ApiResponse.error(err.message));
  }

  console.error("Unhandled error:", err);
  res.status(500).json(ApiResponse.error("An unexpected error occurred"));
}

module.exports = errorHandler;
