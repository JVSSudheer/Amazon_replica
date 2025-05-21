package dev.sudheer.amazon_clone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.sudheer.amazon_clone.dto.request.LoginRequest;
import dev.sudheer.amazon_clone.dto.request.RegisterRequest;
import dev.sudheer.amazon_clone.dto.response.JwtResponse;
import dev.sudheer.amazon_clone.model.User;
import dev.sudheer.amazon_clone.repository.UserRepository;
import dev.sudheer.amazon_clone.utils.JwtUtil;
import org.springframework.http.HttpHeaders;
import jakarta.servlet.http.HttpServletResponse; 

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public ResponseEntity<JwtResponse> registerUser(RegisterRequest registerRequest, HttpServletResponse response) {
        User existingUser = userRepository.findByEmail(registerRequest.email);

        if (existingUser != null) {
            throw new RuntimeException("User already exists");
        }

        User user = new User(
                registerRequest.email,
                passwordEncoder.encode(registerRequest.password),
                registerRequest.name,
                registerRequest.phone);
                
        User savedUser = userRepository.save(user);

        String token = jwtUtil.generateToken(savedUser.getEmail());

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false) 
                .path("/")
                .maxAge(7 * 24 * 60 * 60) 
                .sameSite("Lax") 
                // .domain("http://localhost:3000")
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new JwtResponse(token));

    }

    public ResponseEntity<JwtResponse> loginUser(LoginRequest loginRequest, HttpServletResponse response) {
        User existingUser = userRepository.findByEmail(loginRequest.email);

        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }

        if (!passwordEncoder.matches(loginRequest.password, existingUser.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(existingUser.getEmail());

        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true) 
                .path("/")
                .maxAge(7 * 24 * 60 * 60) 
                .sameSite("Lax") 
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok(new JwtResponse(token));
    }

    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", null)
                .httpOnly(true)
                .secure(true) 
                .path("/")
                .maxAge(0) 
                .sameSite("Lax") 
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok("Logout successful");
    }

}
