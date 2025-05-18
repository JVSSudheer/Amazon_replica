package dev.sudheer.amazon_clone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.sudheer.amazon_clone.dto.request.LoginRequest;
import dev.sudheer.amazon_clone.dto.request.RegisterRequest;
import dev.sudheer.amazon_clone.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request, HttpServletResponse response){
        return ResponseEntity.ok(authService.registerUser(request,response));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest request, HttpServletResponse response){
        authService.loginUser(request, response);
        return ResponseEntity.ok(authService.loginUser(request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        return ResponseEntity.ok(authService.logoutUser(response));
    }
    
}
