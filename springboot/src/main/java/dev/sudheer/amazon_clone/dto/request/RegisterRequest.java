package dev.sudheer.amazon_clone.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    public String email;
    public String password;
    public String name;
    public String phone;

    public RegisterRequest(String email, String password, String name, String phone) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
    }
    
}
