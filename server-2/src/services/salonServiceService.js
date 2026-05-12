const SalonService = require("../models/SalonService");
const Category = require("../models/Category");
const {
  ResourceNotFoundException,
  BadRequestException,
} = require("../utils/errors");

function validateServiceRequest(body) {
  const { price, priceRange, variants } = body;
  const hasPrice = price != null;
  const hasRange = priceRange != null;
  const hasVariants = variants && variants.length > 0;

  if (!hasPrice && !hasRange && !hasVariants) {
    throw new BadRequestException(
      "Service must have a price, price range, or variants"
    );
  }

  if (hasPrice && price <= 0) {
    throw new BadRequestException("Price must be greater than 0");
  }

  if (hasRange) {
    if (priceRange.min <= 0 || priceRange.max <= 0) {
      throw new BadRequestException(
        "Price range values must be greater than 0"
      );
    }
    if (priceRange.min >= priceRange.max) {
      throw new BadRequestException(
        "Price range min must be less than max"
      );
    }
  }

  if (hasVariants) {
    for (const v of variants) {
      if (!v.name || !v.name.trim()) {
        throw new BadRequestException("Variant name is required");
      }
      if (v.price <= 0) {
        throw new BadRequestException("Variant price must be greater than 0");
      }
    }
  }
}

async function getServicesPaged(categoryId, search, page, size) {
  const pageNum = Math.max(parseInt(page) || 0, 0);
  const pageSize = Math.max(parseInt(size) || 50, 1);
  const skip = pageNum * pageSize;
  const sort = { categoryName: 1, name: 1 };

  let filter = { active: true };
  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [{ name: regex }, { categoryName: regex }];
  } else if (categoryId) {
    filter.categoryId = categoryId;
  }

  const [docs, total] = await Promise.all([
    SalonService.find(filter).sort(sort).skip(skip).limit(pageSize),
    SalonService.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  return {
    content: docs,
    page: pageNum,
    size: pageSize,
    totalElements: total,
    totalPages,
    last: pageNum >= totalPages - 1,
  };
}

async function getServiceById(id) {
  const service = await SalonService.findById(id);
  if (!service) {
    throw new ResourceNotFoundException("Service", "id", id);
  }
  return service;
}

async function createService(body) {
  validateServiceRequest(body);

  const category = await Category.findById(body.categoryId);
  if (!category) {
    throw new ResourceNotFoundException("Category", "id", body.categoryId);
  }

  const hasVariants = body.variants && body.variants.length > 0;
  const service = new SalonService({
    name: body.name,
    categoryId: body.categoryId,
    categoryName: category.name,
    description: body.description,
    price: body.price || null,
    priceRange: body.priceRange || null,
    variants: hasVariants ? body.variants : [],
    hasVariants,
    active: true,
    imageUrl: body.imageUrl,
  });

  const saved = await service.save();
  console.log(`Service created: ${saved.name}`);
  return saved;
}

async function updateService(id, body) {
  const service = await SalonService.findById(id);
  if (!service) {
    throw new ResourceNotFoundException("Service", "id", id);
  }

  validateServiceRequest(body);

  const category = await Category.findById(body.categoryId);
  if (!category) {
    throw new ResourceNotFoundException("Category", "id", body.categoryId);
  }

  const hasVariants = body.variants && body.variants.length > 0;

  service.name = body.name;
  service.categoryId = body.categoryId;
  service.categoryName = category.name;
  service.description = body.description;
  service.price = body.price || null;
  service.priceRange = body.priceRange || null;
  service.variants = hasVariants ? body.variants : [];
  service.hasVariants = hasVariants;
  service.imageUrl = body.imageUrl;

  const saved = await service.save();
  console.log(`Service updated: ${saved.name}`);
  return saved;
}

async function deleteService(id) {
  const service = await SalonService.findById(id);
  if (!service) {
    throw new ResourceNotFoundException("Service", "id", id);
  }
  service.active = false;
  await service.save();
  console.log(`Service deleted (soft): ${service.name}`);
}

module.exports = {
  getServicesPaged,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
