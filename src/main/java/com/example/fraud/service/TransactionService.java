package com.example.fraud.service;

import com.example.fraud.dto.DashboardSummaryDTO;
import com.example.fraud.dto.TransactionRequestDTO;
import com.example.fraud.model.Transaction;
import com.example.fraud.model.TransactionStatus;
import com.example.fraud.model.User;
import com.example.fraud.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal; // <-- MAKE SURE THIS IMPORT IS HERE
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // ... (Your existing getSummaryStats and findTransactionsByUser methods) ...

    public DashboardSummaryDTO getSummaryStats() {
        long approvedCount = transactionRepository.countByStatus(TransactionStatus.APPROVED);
        long flaggedCount = transactionRepository.countByStatus(TransactionStatus.FLAGGED);
        long pendingCount = transactionRepository.countByStatus(TransactionStatus.PENDING);
        return new DashboardSummaryDTO(approvedCount, flaggedCount, pendingCount);
    }

    public List<Transaction> findTransactionsByUser(User user) {
        return transactionRepository.findByUserOrderByTimestampDesc(user);
    }


    // THIS IS THE CORRECTED METHOD
    public Transaction createTransaction(TransactionRequestDTO request, User user) {
        Transaction transaction = new Transaction();

        // --- THIS IS THE FIX ---
        transaction.setAmount(BigDecimal.valueOf(request.getAmount()));

        transaction.setLocation(request.getLocation());
        transaction.setUser(user);
        transaction.setTimestamp(LocalDateTime.now());

        // All new transactions start as PENDING
        transaction.setStatus(TransactionStatus.PENDING);

        return transactionRepository.save(transaction);
    }
}