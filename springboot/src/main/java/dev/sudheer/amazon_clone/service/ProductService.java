package dev.sudheer.amazon_clone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import dev.sudheer.amazon_clone.dto.request.ProductRequest;
import dev.sudheer.amazon_clone.model.Product;
import dev.sudheer.amazon_clone.repository.ProductRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ResponseEntity<?> addProduct(ProductRequest productRequest) {
        try {

            Product product = new Product(
                    productRequest.getTitle(),
                    productRequest.getImageUrl(),
                    productRequest.getCategories(),
                    productRequest.getBrand(),
                    productRequest.getPrice(),
                    productRequest.getAttributes());

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

    public ResponseEntity<Product> getProductById(String id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    public ResponseEntity<?> getAllProducts() {
        try {
            return ResponseEntity.ok(productRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error fetching products: " + e.getMessage());
        }
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByTitleContainingIgnoreCase(query);
    }

    public List<Product> findByCategory(String category) {
        return productRepository.findByCategoriesContainingIgnoreCase(category);
    }
}