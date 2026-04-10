package com.sellis.server.controller;

import com.sellis.server.dto.ApiResponse;
import com.sellis.server.dto.CategoryRequest;
import com.sellis.server.dto.ServiceRequest;
import com.sellis.server.model.Category;
import com.sellis.server.model.SalonService;
import com.sellis.server.service.CategoryService;
import com.sellis.server.service.SalonServiceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final SalonServiceService serviceService;
    private final CategoryService categoryService;

    public AdminController(SalonServiceService serviceService, CategoryService categoryService) {
        this.serviceService = serviceService;
        this.categoryService = categoryService;
    }

    // --- Category Management ---

    @PostMapping("/categories")
    public ResponseEntity<ApiResponse<Category>> createCategory(@Valid @RequestBody CategoryRequest request) {
        Category category = categoryService.createCategory(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Category created", category));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Category>> updateCategory(
            @PathVariable String id,
            @Valid @RequestBody CategoryRequest request) {
        Category category = categoryService.updateCategory(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Category updated", category));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.ok("Category deleted", null));
    }

    // --- Service Management ---

    @PostMapping("/services")
    public ResponseEntity<ApiResponse<SalonService>> createService(@Valid @RequestBody ServiceRequest request) {
        SalonService service = serviceService.createService(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Service created", service));
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<ApiResponse<SalonService>> updateService(
            @PathVariable String id,
            @Valid @RequestBody ServiceRequest request) {
        SalonService service = serviceService.updateService(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Service updated", service));
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteService(@PathVariable String id) {
        serviceService.deleteService(id);
        return ResponseEntity.ok(ApiResponse.ok("Service deleted", null));
    }
}
