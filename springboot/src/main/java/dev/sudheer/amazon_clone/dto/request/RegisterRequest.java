package dev.sudheer.amazon_clone.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    public String email;
    public String password;

    public RegisterRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
    
}
