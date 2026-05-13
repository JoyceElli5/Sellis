const Category = require("../models/Category");
const {
  ResourceNotFoundException,
  BadRequestException,
} = require("../utils/errors");

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function getAllActiveCategories() {
  return Category.find({ active: true }).sort({ displayOrder: 1 });
}

async function getCategoryById(id) {
  const category = await Category.findById(id);
  if (!category) {
    throw new ResourceNotFoundException("Category", "id", id);
  }
  return category;
}

async function createCategory({ name, description, displayOrder }) {
  const exists = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });
  if (exists) {
    throw new BadRequestException(`Category with name '${name}' already exists`);
  }

  const category = new Category({
    name,
    slug: generateSlug(name),
    description,
    displayOrder: displayOrder || 0,
    active: true,
  });

  const saved = await category.save();
  console.log(`Category created: ${saved.name}`);
  return saved;
}

async function updateCategory(id, { name, description, displayOrder }) {
  const category = await Category.findById(id);
  if (!category) {
    throw new ResourceNotFoundException("Category", "id", id);
  }

  if (name && name.toLowerCase() !== category.name.toLowerCase()) {
    const exists = await Category.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
      _id: { $ne: id },
    });
    if (exists) {
      throw new BadRequestException(
        `Category with name '${name}' already exists`
      );
    }
  }

  category.name = name || category.name;
  category.slug = generateSlug(category.name);
  category.description =
    description !== undefined ? description : category.description;
  category.displayOrder =
    displayOrder !== undefined ? displayOrder : category.displayOrder;

  return category.save();
}

async function deleteCategory(id) {
  const category = await Category.findById(id);
  if (!category) {
    throw new ResourceNotFoundException("Category", "id", id);
  }
  category.active = false;
  await category.save();
  console.log(`Category deleted (soft): ${category.name}`);
}

module.exports = {
  getAllActiveCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
