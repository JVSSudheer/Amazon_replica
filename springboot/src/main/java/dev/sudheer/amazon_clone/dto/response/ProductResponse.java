package dev.sudheer.amazon_clone.dto.response;

import java.util.Map;

import lombok.Data;

@Data
public class ProductResponse {
    private String id;
    private String title;
    private String imageUrl;
    private String[] categories;
    private String brand;
    private float price;
    private int quantity;
    private Map<String, String> attributes;
    private String createdAt;
}
