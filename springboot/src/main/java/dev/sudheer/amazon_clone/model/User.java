package dev.sudheer.amazon_clone.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="users")// Maps to "users" table in PostgreSQL
@Data // Lombok: Auto-generates getters/setters
@NoArgsConstructor // Lombok: Auto-generates no-args constructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique=true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
