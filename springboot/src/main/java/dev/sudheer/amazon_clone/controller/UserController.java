package dev.sudheer.amazon_clone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.sudheer.amazon_clone.dto.response.UserResponse;
import dev.sudheer.amazon_clone.model.User;
import dev.sudheer.amazon_clone.repository.UserRepository;
import dev.sudheer.amazon_clone.utils.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7).trim();

        try {
            String email = jwtUtil.extractEmail(token);

            User user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());
            response.setName(user.getName());
            response.setPhone(user.getPhone());
            response.setAddress(user.getAddress());
            response.setRole(user.getRole().toString());
            response.setCreatedAt(user.getCreatedAt());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}