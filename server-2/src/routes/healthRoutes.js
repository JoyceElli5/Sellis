const express = require("express");
const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");

const router = express.Router();
const startedAt = new Date();

router.get("/", (req, res) => {
  res.json(
    ApiResponse.ok({
      status: "UP",
      service: "Sellis API",
      timestamp: new Date().toISOString(),
    })
  );
});

router.get("/ping", (req, res) => {
  res.json(ApiResponse.ok({ message: "pong" }));
});

router.get("/db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().command({ ping: 1 });
    res.json(ApiResponse.ok({ database: "UP" }));
  } catch {
    res.status(503).json(ApiResponse.error({ database: "DOWN" }));
  }
});

router.get("/info", (req, res) => {
  const now = new Date();
  const uptimeSeconds = Math.floor((now - startedAt) / 1000);
  const mem = process.memoryUsage();
  res.json(
    ApiResponse.ok({
      service: "Sellis API",
      startedAt: startedAt.toISOString(),
      uptimeSeconds,
      nodeVersion: process.version,
      memoryMaxMb: Math.round(mem.heapTotal / 1024 / 1024),
      memoryUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
    })
  );
});

module.exports = router;
