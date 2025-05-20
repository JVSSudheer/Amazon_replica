package dev.sudheer.amazon_clone.repository;

import dev.sudheer.amazon_clone.model.User;
import dev.sudheer.amazon_clone.model.Product;
import dev.sudheer.amazon_clone.model.UserProducts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProductsRepository extends JpaRepository<UserProducts, String> {
    List<UserProducts> findByUserAndStatus(User user, UserProducts.Status status);
    List<UserProducts> findByUser(User user);
    boolean existsByUserAndProductAndStatus(User user, Product product, UserProducts.Status status);
}