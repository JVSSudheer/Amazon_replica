package dev.sudheer.amazon_clone.dto.request;

import java.util.Map;

import lombok.Data;

@Data
public class ProductRequest {
    public String title;
    public String imageUrl;
    public String[] categories;
    public String brand;
    public double price;
    public Map<String, String> attributes;


    public ProductRequest(String title, String imageUrl, String[] categories,
        String brand, double price, Map<String, String> attributes) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.categories = categories;
        this.brand = brand;
        this.price = price;
        this.attributes = attributes;
    }

}
