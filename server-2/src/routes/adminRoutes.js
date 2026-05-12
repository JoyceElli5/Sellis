const express = require("express");
const { body, validationResult } = require("express-validator");
const { authenticate, requireAdmin } = require("../middleware/auth");
const categoryService = require("../services/categoryService");
const salonServiceService = require("../services/salonServiceService");
const ApiResponse = require("../utils/ApiResponse");

const router = express.Router();

router.use(authenticate, requireAdmin);

function validate(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fieldErrors = {};
    errors.array().forEach((e) => {
      fieldErrors[e.path] = e.msg;
    });
    res.status(400).json(ApiResponse.error(fieldErrors));
    return false;
  }
  return true;
}

// --- Category endpoints ---

router.post(
  "/categories",
  [body("name").notEmpty().withMessage("Name is required")],
  async (req, res, next) => {
    if (!validate(req, res)) return;
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(ApiResponse.ok(category));
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/categories/:id",
  [body("name").notEmpty().withMessage("Name is required")],
  async (req, res, next) => {
    if (!validate(req, res)) return;
    try {
      const category = await categoryService.updateCategory(
        req.params.id,
        req.body
      );
      res.json(ApiResponse.ok(category));
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/categories/:id", async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json(ApiResponse.ok("Category deleted", null));
  } catch (err) {
    next(err);
  }
});

// --- Service endpoints ---

router.post(
  "/services",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("categoryId").notEmpty().withMessage("Category ID is required"),
  ],
  async (req, res, next) => {
    if (!validate(req, res)) return;
    try {
      const service = await salonServiceService.createService(req.body);
      res.status(201).json(ApiResponse.ok(service));
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/services/:id",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("categoryId").notEmpty().withMessage("Category ID is required"),
  ],
  async (req, res, next) => {
    if (!validate(req, res)) return;
    try {
      const service = await salonServiceService.updateService(
        req.params.id,
        req.body
      );
      res.json(ApiResponse.ok(service));
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/services/:id", async (req, res, next) => {
  try {
    await salonServiceService.deleteService(req.params.id);
    res.json(ApiResponse.ok("Service deleted", null));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
