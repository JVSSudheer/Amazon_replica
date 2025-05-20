package dev.sudheer.amazon_clone.service;

import dev.sudheer.amazon_clone.utils.GoogleDriveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import dev.sudheer.amazon_clone.dto.request.ProductRequest;
import dev.sudheer.amazon_clone.model.Product;
import dev.sudheer.amazon_clone.repository.ProductRepository;

import org.springframework.util.StringUtils;

import java.io.IOException;
import java.security.GeneralSecurityException;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    private final GoogleDriveService googleDriveService;

    public ProductService(GoogleDriveService googleDriveService) {
        this.googleDriveService = googleDriveService;
    }

    public ResponseEntity<?> addProduct(ProductRequest productRequest) {
        try {
            // Upload image to Google Drive if provided
            String imageUrl = null;
            if (StringUtils.hasText(productRequest.getImageBase64()) && 
                StringUtils.hasText(productRequest.getImageName())) {
                
                try {
                    imageUrl = googleDriveService.uploadBase64File(
                        productRequest.getImageBase64(),
                        productRequest.getImageName(),
                        productRequest.getImageMimeType()
                    );
                } catch (IOException | GeneralSecurityException e) {
                    return ResponseEntity.internalServerError()
                            .body("Failed to upload product image: " + e.getMessage());
                }
            }

            Product product = new Product(
                productRequest.getTitle(),
                imageUrl,
                productRequest.getCategories(),
                productRequest.getBrand(),
                productRequest.getPrice(),
                productRequest.getAttributes()
            );

            productRepository.save(product);

            return ResponseEntity.ok(product);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error creating product: " + e.getMessage());
        }
    }

    public ResponseEntity<?> deleteProduct(String id) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            productRepository.delete(product);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error deleting product: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getProductById(String id) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error fetching product: " + e.getMessage());
        }
    }

    public ResponseEntity<?> getAllProducts() {
        try {
            return ResponseEntity.ok(productRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error fetching products: " + e.getMessage());
        }
    }
}