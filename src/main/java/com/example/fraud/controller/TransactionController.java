package com.example.fraud.controller;

import com.example.fraud.dto.TransactionRequestDTO; // We will create this next
import com.example.fraud.model.Transaction;
import com.example.fraud.model.User;
import com.example.fraud.repository.UserRepository;
import com.example.fraud.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserRepository userRepository;

    /**
     * This method fixes your "Failed to load transactions." error.
     */
    @GetMapping("/my-history")
    public ResponseEntity<List<Transaction>> getMyHistory(Authentication authentication) {
        // Get the currently logged-in user
        User user = findUserByAuth(authentication);

        // Use the service to get transactions for this user
        List<Transaction> transactions = transactionService.findTransactionsByUser(user);

        return ResponseEntity.ok(transactions);
    }

    /**
     * This method will make your "Submit Transaction" button work.
     */
    @PostMapping("/request")
    public ResponseEntity<Transaction> requestTransaction(@RequestBody TransactionRequestDTO request, Authentication authentication) {
        User user = findUserByAuth(authentication);

        // Call the service to create the new transaction
        Transaction newTransaction = transactionService.createTransaction(request, user);

        return ResponseEntity.ok(newTransaction);
    }

    /**
     * A helper method to get the User object from the security context.
     */
    private User findUserByAuth(Authentication authentication) {
        String username = authentication.getName(); // This is the email
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}