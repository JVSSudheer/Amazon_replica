package dev.sudheer.amazon_clone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.sudheer.amazon_clone.dto.request.LoginRequest;
import dev.sudheer.amazon_clone.dto.request.RegisterRequest;
import dev.sudheer.amazon_clone.dto.response.JwtResponse;
import dev.sudheer.amazon_clone.service.AuthService;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> registerUser(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> loginUser(@RequestBody LoginRequest request){
        authService.loginUser(request);
        return ResponseEntity.ok(authService.loginUser(request));
    }
    
}
