const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const Category = require("../models/Category");
const SalonService = require("../models/SalonService");

function slug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function seed() {
  const email = process.env.ADMIN_EMAIL || "admin@sellis.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123";

  const adminExists = await Admin.findOne({ email });
  if (!adminExists) {
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({
      email,
      password: hashed,
      name: "Sellis Admin",
      role: "ADMIN",
    });
    console.log(`Default admin created: ${email}`);
  }

  const categoryCount = await Category.countDocuments();
  if (categoryCount > 0) {
    console.log("Data already seeded, skipping.");
    return;
  }

  console.log("Seeding sample data...");

  const categoryDefs = [
    { name: "Hair Services", description: "Professional hair care services", displayOrder: 1 },
    { name: "Facials", description: "Facial treatments and skincare", displayOrder: 2 },
    { name: "SPA Services", description: "Relaxation and body treatments", displayOrder: 3 },
    { name: "Nails", description: "Manicure and pedicure services", displayOrder: 4 },
    { name: "Waxing", description: "Hair removal services", displayOrder: 5 },
    { name: "Lashes & Brows", description: "Eye beauty services", displayOrder: 6 },
  ];

  const categories = {};
  for (const def of categoryDefs) {
    const cat = await Category.create({ ...def, slug: slug(def.name), active: true });
    categories[def.name] = cat;
  }

  const svc = (name, catName, opts) => ({
    name,
    categoryId: categories[catName]._id.toString(),
    categoryName: catName,
    active: true,
    hasVariants: !!(opts.variants && opts.variants.length),
    ...opts,
  });

  const services = [
    // Hair Services
    svc("Relaxing", "Hair Services", { price: 150, description: "Hair relaxing treatment" }),
    svc("Relaxing with own cream", "Hair Services", { price: 100, description: "Relaxing with client's cream" }),
    svc("Washing", "Hair Services", { variants: [{ name: "Basic wash", price: 60 }, { name: "Wash & condition", price: 70 }, { name: "Premium wash", price: 80 }], description: "Hair washing services" }),
    svc("Cornrow with own hair", "Hair Services", { price: 50, description: "Cornrow braiding with natural hair" }),
    svc("Cornrow with extension", "Hair Services", { price: 200, description: "Cornrow braiding with extensions" }),
    svc("Hair treatment", "Hair Services", { price: 170, description: "Deep conditioning treatment" }),
    svc("Ponytail (with extension)", "Hair Services", { price: 300, description: "Ponytail styling with extension" }),
    svc("Ponytail (without extension)", "Hair Services", { price: 140, description: "Ponytail styling without extension" }),
    svc("Installation", "Hair Services", { price: 150, description: "Hair installation service" }),
    svc("Braiding (with extension)", "Hair Services", { priceRange: { min: 300, max: 450 }, description: "Braiding with extensions" }),
    svc("Braiding (without extension)", "Hair Services", { price: 250, description: "Braiding without extensions" }),

    // Facials
    svc("Deep cleansing", "Facials", { price: 350, description: "Deep cleansing facial" }),
    svc("Dermaplaning", "Facials", { price: 400, description: "Dermaplaning facial treatment" }),

    // SPA Services
    svc("Swedish massage (60 mins)", "SPA Services", { price: 300, description: "60 minute Swedish massage" }),
    svc("Deep tissue massage", "SPA Services", { price: 350, description: "Deep tissue massage therapy" }),
    svc("Hot stone massage", "SPA Services", { price: 400, description: "Hot stone massage therapy" }),
    svc("Aromatherapy massage", "SPA Services", { price: 350, description: "Aromatherapy massage" }),
    svc("Back massage (30 mins)", "SPA Services", { price: 200, description: "30 minute back massage" }),
    svc("Foot massage (30 mins)", "SPA Services", { price: 100, description: "30 minute foot massage" }),
    svc("Wood therapy", "SPA Services", { price: 400, description: "Wood therapy body treatment" }),

    // Nails
    svc("Classic pedicure", "Nails", { price: 140, description: "Classic pedicure treatment" }),
    svc("Manicure", "Nails", { price: 100, description: "Classic manicure" }),
    svc("Pedicure with gel polish", "Nails", { price: 180, description: "Pedicure with gel polish finish" }),
    svc("Stick-on", "Nails", { priceRange: { min: 80, max: 100 }, description: "Press-on nail application" }),
    svc("Stick-on with gel polish", "Nails", { price: 130, description: "Press-on nails with gel polish" }),
    svc("Acrylic nails", "Nails", { priceRange: { min: 120, max: 300 }, description: "Acrylic nail extensions" }),
    svc("Acrylic refill", "Nails", { price: 150, description: "Acrylic nail refill" }),

    // Waxing
    svc("Full leg wax", "Waxing", { price: 200, description: "Full leg waxing" }),
    svc("Half leg wax", "Waxing", { price: 120, description: "Half leg waxing" }),
    svc("Full arm wax", "Waxing", { price: 150, description: "Full arm waxing" }),
    svc("Half arm wax", "Waxing", { price: 100, description: "Half arm waxing" }),
    svc("Underarm wax", "Waxing", { price: 60, description: "Underarm waxing" }),
    svc("Bikini wax", "Waxing", { price: 150, description: "Bikini line waxing" }),
    svc("Brazilian wax", "Waxing", { price: 250, description: "Brazilian waxing" }),
    svc("Upper lip wax", "Waxing", { price: 40, description: "Upper lip waxing" }),
    svc("Chin wax", "Waxing", { price: 40, description: "Chin waxing" }),
    svc("Full face wax", "Waxing", { price: 100, description: "Full face waxing" }),
    svc("Back wax", "Waxing", { price: 200, description: "Back waxing" }),
    svc("Chest wax", "Waxing", { price: 200, description: "Chest waxing" }),

    // Lashes & Brows
    svc("Eyelash extensions", "Lashes & Brows", { variants: [{ name: "Classic set", price: 300 }, { name: "Hybrid set", price: 400 }, { name: "Volume set", price: 500 }], description: "Professional eyelash extensions" }),
    svc("Lash lift", "Lashes & Brows", { variants: [{ name: "Lash lift only", price: 200 }, { name: "Lash lift & tint", price: 250 }], description: "Lash lifting treatment" }),
    svc("Lash removal", "Lashes & Brows", { price: 80, description: "Eyelash extension removal" }),
    svc("Eyelash refill", "Lashes & Brows", { variants: [{ name: "Classic refill", price: 200 }, { name: "Hybrid refill", price: 250 }, { name: "Volume refill", price: 300 }], description: "Eyelash extension refill" }),
    svc("Brow lamination", "Lashes & Brows", { price: 180, description: "Brow lamination treatment" }),
    svc("Brow tint", "Lashes & Brows", { price: 80, description: "Eyebrow tinting" }),
    svc("Brow wax & shape", "Lashes & Brows", { price: 60, description: "Eyebrow waxing and shaping" }),
    svc("Brow combo", "Lashes & Brows", { variants: [{ name: "Lamination & tint", price: 220 }, { name: "Wax & tint", price: 120 }], description: "Brow treatment combo" }),
  ];

  await SalonService.insertMany(services);
  console.log(`Seeded ${categoryDefs.length} categories and ${services.length} services.`);
}

module.exports = { seed };
