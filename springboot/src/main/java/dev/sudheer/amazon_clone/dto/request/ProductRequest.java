package dev.sudheer.amazon_clone.dto.request;

import java.util.Map;

import lombok.Data;

@Data
public class ProductRequest {
    public String title;
    public String imageName;
    public String imageMimeType;
    public String imageBase64;
    public String[] categories;
    public String brand;
    public double price;
    public Map<String, String> attributes;


    public ProductRequest(String title, String imageName, String imageMimeType, String imageBase64, String[] categories,
        String brand, double price, Map<String, String> attributes) {
        this.title = title;
        this.imageName = imageName;
        this.imageMimeType = imageMimeType;
        this.imageBase64 = imageBase64;
        this.categories = categories;
        this.brand = brand;
        this.price = price;
        this.attributes = attributes;
    }

}
