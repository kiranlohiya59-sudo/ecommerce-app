
package com.example.ecommerceapp.controller;

import com.example.ecommerceapp.dto.ProductDTO;
import com.example.ecommerceapp.entity.Product;
import com.example.ecommerceapp.mapper.ProductMapper;
import com.example.ecommerceapp.repository.ProductRepository;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private static final Logger logger =
            LoggerFactory.getLogger(ProductController.class);

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(
            @Valid @RequestBody ProductDTO productDTO) {

        logger.info("Creating a new product");

        Product product = ProductMapper.toEntity(productDTO);
        Product savedProduct = productRepository.save(product);

        logger.info("Product created successfully with ID: {}",
                savedProduct.getId());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ProductMapper.toDTO(savedProduct));
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {

        logger.info("Fetching all products");

        List<ProductDTO> products = productRepository.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .toList();

        logger.info("Total products found: {}", products.size());

        return ResponseEntity.ok(products);
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(
            @PathVariable Long id) {

        logger.info("Fetching product with ID: {}", id);

        return productRepository.findById(id)
                .map(product -> {
                    logger.info("Product found with ID: {}", id);
                    return ResponseEntity.ok(
                            ProductMapper.toDTO(product));
                })
                .orElseGet(() -> {
                    logger.warn("Product not found with ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTO productDTO) {

        logger.info("Updating product with ID: {}", id);

        return productRepository.findById(id)
                .map(existingProduct -> {
                    existingProduct.setName(productDTO.getName());
                    existingProduct.setPrice(productDTO.getPrice());
                    existingProduct.setDescription(
                            productDTO.getDescription());

                    Product updatedProduct =
                            productRepository.save(existingProduct);

                    logger.info(
                            "Product updated successfully with ID: {}", id);

                    return ResponseEntity.ok(
                            ProductMapper.toDTO(updatedProduct));
                })
                .orElseGet(() -> {
                    logger.warn(
                            "Cannot update. Product not found with ID: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        logger.info("Deleting product with ID: {}", id);

        if (!productRepository.existsById(id)) {
            logger.warn(
                    "Cannot delete. Product not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        }

        productRepository.deleteById(id);

        logger.info("Product deleted successfully with ID: {}", id);

        return ResponseEntity.noContent().build();
    }
}