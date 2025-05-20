package dev.sudheer.amazon_clone.dto.response;

import dev.sudheer.amazon_clone.model.Product;
import lombok.Data;

@Data
public class UserProductResponse {
    private String id;
    private Product product;
    private int quantity;
    private double cost;
    private String status;
    private String createdAt;
}