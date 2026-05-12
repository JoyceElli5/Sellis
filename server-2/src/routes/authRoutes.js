const express = require("express");
const { body, validationResult } = require("express-validator");
const authService = require("../services/authService");
const ApiResponse = require("../utils/ApiResponse");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const fieldErrors = {};
      errors.array().forEach((e) => {
        fieldErrors[e.path] = e.msg;
      });
      return res.status(400).json(ApiResponse.error(fieldErrors));
    }

    try {
      const result = await authService.login(req.body.email, req.body.password);
      res.json(ApiResponse.ok(result));
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
