package dev.sudheer.amazon_clone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.sudheer.amazon_clone.model.Product;

public interface ProductRepository extends JpaRepository<Product, String>, JpaSpecificationExecutor<Product> {
    List<Product> findByTitleContainingIgnoreCase(String query);
    List<Product> findByBrand(String brand);
    List<Product> findByTitleContainingIgnoreCaseAndBrand(String query, String brand);
    @Query(value = "SELECT * FROM products p WHERE EXISTS (SELECT 1 FROM UNNEST(p.categories) AS c WHERE LOWER(c) LIKE LOWER(CONCAT('%', :category, '%')))", 
       nativeQuery = true)
List<Product> findByCategoriesContainingIgnoreCase(@Param("category") String category);
}