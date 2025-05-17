package dev.sudheer.amazon_clone.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import dev.sudheer.amazon_clone.model.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
    Boolean existsByEmail(String email);
}
