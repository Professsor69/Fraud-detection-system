package com.example.fraud.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity in this demo
                .authorizeHttpRequests(auth -> auth
                        // Allow static resources and auth endpoints
                        .requestMatchers("/", "/main.html", "/app.js", "/api/auth/**").permitAll()
                        // H2 console
                        .requestMatchers("/h2-console/**").permitAll()
                        // Admin endpoints
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // User endpoints
                        .requestMatchers("/api/user/**", "/api/transactions/**", "/api/dashboard/**").hasAnyRole("USER", "ADMIN")
                        // All other requests
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/main.html") // Your main page is the login page
                        .loginProcessingUrl("/api/auth/login") // The URL your frontend will POST to
                        .successHandler((request, response, authentication) -> response.setStatus(200)) // Send 200 OK on success
                        .failureHandler((request, response, exception) -> response.sendError(401, "Invalid credentials")) // Send 401 on fail
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/api/auth/logout", "POST"))
                        .logoutSuccessHandler((request, response, authentication) -> response.setStatus(200))
                        .permitAll()
                )
                // For H2 console
                .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
}