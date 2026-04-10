package com.sellis.server.service;

import com.sellis.server.dto.PagedResponse;
import com.sellis.server.dto.ServiceRequest;
import com.sellis.server.exception.BadRequestException;
import com.sellis.server.exception.ResourceNotFoundException;
import com.sellis.server.model.Category;
import com.sellis.server.model.SalonService;
import com.sellis.server.repository.SalonServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class SalonServiceService {

    private static final Logger log = LoggerFactory.getLogger(SalonServiceService.class);

    private final SalonServiceRepository serviceRepository;
    private final CategoryService categoryService;

    public SalonServiceService(SalonServiceRepository serviceRepository, CategoryService categoryService) {
        this.serviceRepository = serviceRepository;
        this.categoryService = categoryService;
    }

    public List<SalonService> getAllActiveServices() {
        return serviceRepository.findByActiveTrueOrderByCategoryNameAscNameAsc();
    }

    public List<SalonService> getServicesByCategory(String categoryId) {
        return serviceRepository.findByCategoryIdAndActiveTrue(categoryId);
    }

    public PagedResponse<SalonService> getServicesPaged(String categoryId, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("categoryName", "name"));
        Page<SalonService> result;

        if (StringUtils.hasText(search)) {
            result = serviceRepository.searchByNameOrCategory(search, pageable);
        } else if (StringUtils.hasText(categoryId)) {
            result = serviceRepository.findByCategoryIdAndActiveTrue(categoryId, pageable);
        } else {
            result = serviceRepository.findByActiveTrue(pageable);
        }

        return new PagedResponse<>(
                result.getContent(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages(),
                result.isLast()
        );
    }

    public SalonService getServiceById(String id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", id));
    }

    public SalonService createService(ServiceRequest request) {
        Category category = categoryService.getCategoryById(request.getCategoryId());
        validateServiceRequest(request);

        SalonService service = new SalonService();
        service.setName(request.getName());
        service.setCategoryId(category.getId());
        service.setCategoryName(category.getName());
        service.setDescription(request.getDescription());
        service.setPrice(request.getPrice());
        service.setPriceRange(request.getPriceRange());
        service.setVariants(request.getVariants() != null ? request.getVariants() : new ArrayList<>());
        service.setHasVariants(request.getVariants() != null && !request.getVariants().isEmpty());
        service.setImageUrl(request.getImageUrl());
        service.setActive(true);

        SalonService saved = serviceRepository.save(service);
        log.info("Created service: {} in category: {}", saved.getName(), category.getName());
        return saved;
    }

    public SalonService updateService(String id, ServiceRequest request) {
        SalonService existing = getServiceById(id);
        Category category = categoryService.getCategoryById(request.getCategoryId());
        validateServiceRequest(request);

        existing.setName(request.getName());
        existing.setCategoryId(category.getId());
        existing.setCategoryName(category.getName());
        existing.setDescription(request.getDescription());
        existing.setPrice(request.getPrice());
        existing.setPriceRange(request.getPriceRange());
        existing.setVariants(request.getVariants() != null ? request.getVariants() : new ArrayList<>());
        existing.setHasVariants(request.getVariants() != null && !request.getVariants().isEmpty());
        existing.setImageUrl(request.getImageUrl());

        SalonService saved = serviceRepository.save(existing);
        log.info("Updated service: {}", saved.getName());
        return saved;
    }

    public void deleteService(String id) {
        SalonService service = getServiceById(id);
        service.setActive(false);
        serviceRepository.save(service);
        log.info("Soft-deleted service: {}", service.getName());
    }

    private void validateServiceRequest(ServiceRequest request) {
        boolean hasPrice = request.getPrice() != null;
        boolean hasRange = request.getPriceRange() != null;
        boolean hasVariants = request.getVariants() != null && !request.getVariants().isEmpty();

        if (!hasPrice && !hasRange && !hasVariants) {
            throw new BadRequestException("Service must have a price, price range, or variants");
        }

        if (hasRange) {
            if (request.getPriceRange().getMin() <= 0 || request.getPriceRange().getMax() <= 0) {
                throw new BadRequestException("Price range values must be positive");
            }
            if (request.getPriceRange().getMin() >= request.getPriceRange().getMax()) {
                throw new BadRequestException("Price range min must be less than max");
            }
        }

        if (hasPrice && request.getPrice() <= 0) {
            throw new BadRequestException("Price must be positive");
        }

        if (hasVariants) {
            for (var variant : request.getVariants()) {
                if (!StringUtils.hasText(variant.getName())) {
                    throw new BadRequestException("Variant name is required");
                }
                if (variant.getPrice() <= 0) {
                    throw new BadRequestException("Variant price must be positive");
                }
            }
        }
    }
}
