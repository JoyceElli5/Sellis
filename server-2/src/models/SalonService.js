const mongoose = require("mongoose");

const serviceVariantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const priceRangeSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  { _id: false }
);

const salonServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryId: { type: String, required: true, index: true },
    categoryName: { type: String },
    description: { type: String },
    price: { type: Number },
    priceRange: { type: priceRangeSchema },
    variants: { type: [serviceVariantSchema] },
    hasVariants: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    imageUrl: { type: String },
  },
  { timestamps: true, collection: "services" }
);

salonServiceSchema.index({ categoryId: 1, active: 1 });

module.exports = mongoose.model("SalonService", salonServiceSchema);
