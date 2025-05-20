package dev.sudheer.amazon_clone.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="users_products")
@NoArgsConstructor
public class UserProducts {
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToOne
    @JoinColumn(name="product_id", nullable=false)
    private Product product;

    @Column(nullable=false)
    private int quantity;

    public enum Status {
        CART,
        PURCHASED
    }

    @Column(nullable=false)
    private double cost;

    @Enumerated(EnumType.STRING)
    @Column(nullable=false)
    private Status status;
    
    @Column()
    private String createdAt;

    public UserProducts(User user, Product product, int quantity, double cost, String status) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
        this.cost = cost;
        this.status = status.equals("PURCHASED") ? Status.PURCHASED : Status.CART;
        this.createdAt = String.valueOf(System.currentTimeMillis());
    }


}
