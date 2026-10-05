package com.example.ecommerceapp.mapper;

import com.example.ecommerceapp.entity.Product;
import dto.ProductDTO;

public class ProductMapper {

    private ProductMapper() {
        // Utility class
    }

    // Entity -> DTO
    public static ProductDTO toDTO(Product product) {

        if (product == null) {
            return null;
        }

        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription()
        );
    }

    // DTO -> Entity
    public static Product toEntity(ProductDTO productDTO) {

        if (productDTO == null) {
            return null;
        }

        Product product = new Product();

        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());

        return product;
    }
}