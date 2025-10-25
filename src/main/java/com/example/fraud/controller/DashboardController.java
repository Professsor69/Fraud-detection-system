package com.example.fraud.controller;

import com.example.fraud.dto.DashboardSummaryDTO;
import com.example.fraud.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private TransactionService transactionService; // Inject the service

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getDashboardSummary() {

        // Call the new service method
        DashboardSummaryDTO summary = transactionService.getSummaryStats();

        // Return the summary data as JSON
        return ResponseEntity.ok(summary);
    }
}