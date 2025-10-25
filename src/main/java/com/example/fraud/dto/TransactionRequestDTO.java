package com.example.fraud.dto;

public class TransactionRequestDTO {
    private double amount;
    private String location;

    // Getters (needed for Spring to read the data)
    public double getAmount() {
        return amount;
    }

    public String getLocation() {
        return location;
    }
}