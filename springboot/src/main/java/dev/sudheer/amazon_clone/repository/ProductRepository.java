package dev.sudheer.amazon_clone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.sudheer.amazon_clone.model.Product;

public interface ProductRepository extends JpaRepository<Product, String> {
    
}
