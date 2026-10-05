
package com.example.ecommerceapp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public class ProductDTO {

    private Long id;

    @NotBlank(message = "Product name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @Positive(message = "Price must be greater than zero")
    private double price;

    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String name,
                      double price, String description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}