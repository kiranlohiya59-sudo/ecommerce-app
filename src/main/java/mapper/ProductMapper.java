
package com.example.ecommerceapp.mapper;

import com.example.ecommerceapp.dto.ProductDTO;
import com.example.ecommerceapp.entity.Product;

public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription()
        );
    }

    public static Product toEntity(ProductDTO dto) {
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());

        return product;
    }
}