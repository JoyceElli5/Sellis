package com.sellis.server.controller;

import com.sellis.server.dto.ApiResponse;
import com.sellis.server.dto.PagedResponse;
import com.sellis.server.model.Category;
import com.sellis.server.model.SalonService;
import com.sellis.server.service.CategoryService;
import com.sellis.server.service.SalonServiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicController {

    private final SalonServiceService serviceService;
    private final CategoryService categoryService;

    public PublicController(SalonServiceService serviceService, CategoryService categoryService) {
        this.serviceService = serviceService;
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<Category>>> getCategories() {
        return ResponseEntity.ok(ApiResponse.ok(categoryService.getAllActiveCategories()));
    }

    @GetMapping("/services")
    public ResponseEntity<ApiResponse<PagedResponse<SalonService>>> getServices(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {

        PagedResponse<SalonService> response = serviceService.getServicesPaged(category, search, page, size);
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @GetMapping("/services/{id}")
    public ResponseEntity<ApiResponse<SalonService>> getService(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(serviceService.getServiceById(id)));
    }
}
