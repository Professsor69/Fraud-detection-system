package com.example.fraud.repository;

import com.example.fraud.model.Transaction;
import com.example.fraud.model.TransactionStatus;
import com.example.fraud.model.User; // <-- ADD THIS IMPORT
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; // <-- ADD THIS IMPORT

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    long countByStatus(TransactionStatus status);

    // ADD THIS NEW METHOD:
    List<Transaction> findByUserOrderByTimestampDesc(User user);
}