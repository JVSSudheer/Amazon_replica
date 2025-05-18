package dev.sudheer.amazon_clone.dto.response;

import lombok.Data;

@Data
public class UserResponse {
    private String id;
    private String email;
    private String name;
    private String phone;
    private String address;
    private String role;
    private String createdAt;
}
