package com.sellis.server.dto;

import com.sellis.server.model.PriceRange;
import com.sellis.server.model.ServiceVariant;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

public class ServiceRequest {

    @NotBlank(message = "Service name is required")
    private String name;

    @NotBlank(message = "Category ID is required")
    private String categoryId;

    private String description;
    private Double price;
    private PriceRange priceRange;
    private List<ServiceVariant> variants;
    private String imageUrl;

    public ServiceRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public PriceRange getPriceRange() { return priceRange; }
    public void setPriceRange(PriceRange priceRange) { this.priceRange = priceRange; }
    public List<ServiceVariant> getVariants() { return variants; }
    public void setVariants(List<ServiceVariant> variants) { this.variants = variants; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
