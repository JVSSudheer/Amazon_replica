package dev.sudheer.amazon_clone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.sudheer.amazon_clone.dto.request.LoginRequest;
import dev.sudheer.amazon_clone.dto.request.RegisterRequest;
import dev.sudheer.amazon_clone.dto.response.JwtResponse;
import dev.sudheer.amazon_clone.model.User;
import dev.sudheer.amazon_clone.repository.UserRepository;
import dev.sudheer.amazon_clone.utils.JwtUtil;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public JwtResponse registerUser(RegisterRequest registerRequest){
        User existingUser= userRepository.findByEmail(registerRequest.email);

        if(existingUser!=null){
            throw new RuntimeException("User already exists");
        }

        User user= new User(
            registerRequest.email,
            passwordEncoder.encode(registerRequest.password)
        );
        User savedUser=userRepository.save(user);

        String token= jwtUtil.generateToken(savedUser.getEmail());

        return new JwtResponse(token);

    }

    public JwtResponse loginUser(LoginRequest loginRequest){
        User existingUser= userRepository.findByEmail(loginRequest.email);

        if(existingUser==null){
            throw new RuntimeException("User not found");
        }

        if(!passwordEncoder.matches(loginRequest.password, existingUser.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(existingUser.getEmail());

        return new JwtResponse(token);
    }

}
