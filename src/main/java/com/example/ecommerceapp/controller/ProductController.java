package com.example.ecommerceapp.controller;

import dto.ProductDTO;
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
@CrossOrigin(origins = "http://localhost:5173")
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

        logger.info("Creating product: {}", productDTO.getName());

        Product product = ProductMapper.toEntity(productDTO);

        Product savedProduct = productRepository.save(product);

        return ResponseEntity
                .status(HttpStatus.CREATED)
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

        return ResponseEntity.ok(products);
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(
            @PathVariable Long id) {

        logger.info("Fetching product with id: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        ));

        return ResponseEntity.ok(ProductMapper.toDTO(product));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTO productDTO) {

        logger.info("Updating product with id: {}", id);

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        ));

        existingProduct.setName(productDTO.getName());
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setDescription(productDTO.getDescription());

        Product updatedProduct =
                productRepository.save(existingProduct);

        return ResponseEntity.ok(
                ProductMapper.toDTO(updatedProduct)
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        logger.info("Deleting product with id: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Product not found with id: " + id
                        ));

        productRepository.delete(product);

        return ResponseEntity.noContent().build();
    }
}