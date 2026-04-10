package com.sellis.server.config;

import com.sellis.server.model.*;
import com.sellis.server.repository.AdminRepository;
import com.sellis.server.repository.CategoryRepository;
import com.sellis.server.repository.SalonServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final CategoryRepository categoryRepo;
    private final SalonServiceRepository serviceRepo;
    private final AdminRepository adminRepo;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.default-email}")
    private String adminEmail;

    @Value("${app.admin.default-password}")
    private String adminPassword;

    public DataSeeder(CategoryRepository categoryRepo,
                      SalonServiceRepository serviceRepo,
                      AdminRepository adminRepo,
                      PasswordEncoder passwordEncoder) {
        this.categoryRepo = categoryRepo;
        this.serviceRepo = serviceRepo;
        this.adminRepo = adminRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        if (categoryRepo.count() == 0) {
            seedData();
        } else {
            log.info("Database already seeded, skipping.");
        }
    }

    private void seedAdmin() {
        if (!adminRepo.existsByEmail(adminEmail)) {
            Admin admin = new Admin();
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setName("Sellis Admin");
            admin.setRole("ADMIN");
            adminRepo.save(admin);
            log.info("Default admin created: {}", adminEmail);
        }
    }

    private void seedData() {
        log.info("Seeding database with initial data...");

        // --- Categories ---
        Category hair = saveCategory("Hair Services", "hair-services", 1);
        Category facials = saveCategory("Facials", "facials", 2);
        Category spa = saveCategory("SPA Services", "spa-services", 3);
        Category nails = saveCategory("Nails", "nails", 4);
        Category waxing = saveCategory("Waxing", "waxing", 5);
        Category lashes = saveCategory("Lashes & Brows", "lashes-brows", 6);

        // --- Hair Services ---
        saveFixed(hair, "Relaxing", 150);
        saveFixed(hair, "Relaxing with own cream", 100);
        saveWithVariants(hair, "Washing", List.of(
                v("Standard wash", 60),
                v("Premium wash", 70),
                v("Deep conditioning wash", 80)
        ));
        saveFixed(hair, "Cornrow with own hair", 50);
        saveFixed(hair, "Cornrow with extension", 200);
        saveFixed(hair, "Hair treatment", 170);
        saveFixed(hair, "Ponytail (with extension)", 300);
        saveFixed(hair, "Ponytail (without extension)", 140);
        saveFixed(hair, "Installation", 150);
        saveWithRange(hair, "Braiding (with extension)", 300, 450);
        saveFixed(hair, "Braiding (without extension)", 250);

        // --- Facials ---
        saveFixed(facials, "Deep cleansing", 350);
        saveFixed(facials, "Dermaplaning", 400);

        // --- SPA Services ---
        saveFixed(spa, "Swedish massage (60 mins)", 300);
        saveFixed(spa, "Deep tissue massage", 350);
        saveFixed(spa, "Hot stone massage", 400);
        saveFixed(spa, "Aromatherapy massage", 350);
        saveFixed(spa, "Back massage (30 mins)", 200);
        saveFixed(spa, "Foot massage (30 mins)", 100);
        saveFixed(spa, "Wood therapy", 400);

        // --- Nails ---
        saveFixed(nails, "Classic pedicure", 140);
        saveFixed(nails, "Manicure", 100);
        saveFixed(nails, "Pedicure with gel polish", 180);
        saveWithRange(nails, "Stick-on", 80, 100);
        saveFixed(nails, "Stick-on with gel polish", 130);
        saveWithRange(nails, "Acrylic nails", 120, 300);
        saveFixed(nails, "Acrylic refill", 150);

        // --- Waxing ---
        saveFixed(waxing, "Full leg wax", 200);
        saveFixed(waxing, "Half leg wax", 120);
        saveFixed(waxing, "Full arm wax", 150);
        saveFixed(waxing, "Half arm wax", 100);
        saveFixed(waxing, "Underarm wax", 60);
        saveFixed(waxing, "Bikini wax", 150);
        saveFixed(waxing, "Brazilian wax", 250);
        saveFixed(waxing, "Upper lip wax", 40);
        saveFixed(waxing, "Chin wax", 40);
        saveFixed(waxing, "Full face wax", 100);
        saveFixed(waxing, "Back wax", 200);
        saveFixed(waxing, "Chest wax", 200);

        // --- Lashes & Brows ---
        saveWithVariants(lashes, "Eyelash extensions", List.of(
                v("Classic set", 300),
                v("Hybrid set", 400),
                v("Volume set", 500)
        ));
        saveWithVariants(lashes, "Lash lift", List.of(
                v("Lash lift only", 200),
                v("Lash lift & tint", 250)
        ));
        saveFixed(lashes, "Lash removal", 80);
        saveWithVariants(lashes, "Eyelash refill", List.of(
                v("Classic refill", 200),
                v("Hybrid refill", 250),
                v("Volume refill", 300)
        ));
        saveFixed(lashes, "Brow lamination", 180);
        saveFixed(lashes, "Brow tint", 80);
        saveFixed(lashes, "Brow wax & shape", 60);
        saveWithVariants(lashes, "Brow combo", List.of(
                v("Brow lamination & tint", 220),
                v("Brow wax, shape & tint", 120)
        ));

        log.info("Database seeded successfully.");
    }

    private Category saveCategory(String name, String slug, int order) {
        Category cat = new Category();
        cat.setName(name);
        cat.setSlug(slug);
        cat.setDisplayOrder(order);
        cat.setActive(true);
        return categoryRepo.save(cat);
    }

    private void saveFixed(Category cat, String name, double price) {
        SalonService service = new SalonService();
        service.setName(name);
        service.setCategoryId(cat.getId());
        service.setCategoryName(cat.getName());
        service.setPrice(price);
        service.setHasVariants(false);
        service.setActive(true);
        serviceRepo.save(service);
    }

    private void saveWithRange(Category cat, String name, double min, double max) {
        SalonService service = new SalonService();
        service.setName(name);
        service.setCategoryId(cat.getId());
        service.setCategoryName(cat.getName());
        service.setPriceRange(new PriceRange(min, max));
        service.setHasVariants(false);
        service.setActive(true);
        serviceRepo.save(service);
    }

    private void saveWithVariants(Category cat, String name, List<ServiceVariant> variants) {
        SalonService service = new SalonService();
        service.setName(name);
        service.setCategoryId(cat.getId());
        service.setCategoryName(cat.getName());
        service.setVariants(new ArrayList<>(variants));
        service.setHasVariants(true);
        service.setActive(true);
        serviceRepo.save(service);
    }

    private ServiceVariant v(String name, double price) {
        return new ServiceVariant(name, price);
    }
}
