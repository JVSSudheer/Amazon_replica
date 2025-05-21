package dev.sudheer.amazon_clone.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.sudheer.amazon_clone.service.OpenAIService;
import dev.sudheer.amazon_clone.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductCategoryController {

    @Autowired
    private OpenAIService openAIService;
    
    @Autowired
    private ProductService productService;

    @PostMapping("/analyze-image")
    public ResponseEntity<Map<String, String>> analyzeImage(
            @RequestParam(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "imageUrl", required = false) String imageUrl) {
        
        try {
            String category = openAIService.analyzeImageCategory(
                imageFile != null ? imageFile.getBytes() : null, 
                imageUrl
            );

            System.out.println("Category: " + category);
            
            return ResponseEntity.ok(Map.of("category", category));
        } catch (Exception e) {
            System.err.println("Error analyzing image: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/by-category")
    public ResponseEntity<Object> getProductsByCategory(
            @RequestParam String category) {
        return ResponseEntity.ok(productService.findByCategory(category));
    }
}
