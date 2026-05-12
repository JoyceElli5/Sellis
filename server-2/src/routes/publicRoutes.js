const express = require("express");
const categoryService = require("../services/categoryService");
const salonServiceService = require("../services/salonServiceService");
const ApiResponse = require("../utils/ApiResponse");

const router = express.Router();

router.get("/categories", async (req, res, next) => {
  try {
    const categories = await categoryService.getAllActiveCategories();
    res.json(ApiResponse.ok(categories));
  } catch (err) {
    next(err);
  }
});

router.get("/services", async (req, res, next) => {
  try {
    const { category, search, page = 0, size = 50 } = req.query;
    const result = await salonServiceService.getServicesPaged(
      category,
      search,
      page,
      size
    );
    res.json(ApiResponse.ok(result));
  } catch (err) {
    next(err);
  }
});

router.get("/services/:id", async (req, res, next) => {
  try {
    const service = await salonServiceService.getServiceById(req.params.id);
    res.json(ApiResponse.ok(service));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
