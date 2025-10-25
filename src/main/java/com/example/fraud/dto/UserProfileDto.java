package com.example.fraud.dto;

import com.example.fraud.model.Role;
import com.example.fraud.model.User;

// DTO to send user info to the frontend
public record UserProfileDto(
        String id,
        String username,
        String fullName,
        String email,
        String country,
        String phoneNumber,
        Role role
) {
    public static UserProfileDto fromUser(User user) {
        return new UserProfileDto(
                user.getId().toString(),
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getCountry(),
                user.getPhoneNumber(),
                user.getRole()
        );
    }
}