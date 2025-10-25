package com.example.fraud.config;

import com.example.fraud.model.Role;
import com.example.fraud.model.User;
import com.example.fraud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Only add data if the admin user doesn't exist
        if (!userRepository.existsByEmail("admin@example.com")) {
            User admin = new User(
                    "admin@example.com",
                    "Admin",
                    passwordEncoder.encode("password123"),
                    "USA",
                    Role.ROLE_ADMIN,
                    "Administrator"
            );
            userRepository.save(admin);
        }

        if (!userRepository.existsByEmail("alice@example.com")) {
            User alice = new User(
                    "alice@example.com",
                    "Alice",
                    passwordEncoder.encode("password123"),
                    "USA",
                    Role.ROLE_USER,
                    "Alice Smith"
            );
            userRepository.save(alice);
        }
    }
}