package dev.sudheer.amazon_clone.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String[] categories;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private int quantity;

    @ElementCollection
    @CollectionTable(name = "product_attributes", joinColumns = @JoinColumn(name = "product_id"))
    @MapKeyColumn(name = "attribute_key")
    @Column()
    private Map<String, String> attributes;

    @OneToMany(mappedBy="product", cascade=CascadeType.ALL, orphanRemoval = true)
    private List<UserProducts> userProducts ;

    @Column(nullable = false)
    private String createdAt;

    public Product(String title, String imageUrl, String[] categories, String brand, Double price, Map<String, String> attributes) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.categories = categories;
        this.brand = brand;
        this.price = price;
        this.quantity = 100;
        this.attributes = attributes;
        this.userProducts = new ArrayList<>();
        this.createdAt = String.valueOf(System.currentTimeMillis());
    }
}