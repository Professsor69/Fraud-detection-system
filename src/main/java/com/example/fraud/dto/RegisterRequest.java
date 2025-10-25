package com.example.fraud.dto;

public record RegisterRequest(String username, String email, String password, String country) {}