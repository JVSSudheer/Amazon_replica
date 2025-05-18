package dev.sudheer.amazon_clone.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")
@Data 
@NoArgsConstructor 
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(unique=true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private String address;
    
    public enum Role {
        USER,
        ADMIN
    }

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "createdAt", updatable = false)
    private String createdAt;
    
    public User(String email, String password, String name, String phone) {
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.name = name;
        this.address = "";
        this.role = Role.USER;
        this.createdAt = String.valueOf(System.currentTimeMillis());
    }

}
