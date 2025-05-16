package com.moneytracker.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;

    private String category; // "family" or "savings"
    private String action;   // "add" or "deduct"
    private Double amount;
    private LocalDateTime timestamp;

    public Transaction() {}

    public Transaction(String category, String action, Double amount, LocalDateTime timestamp) {
        this.category = category;
        this.action = action;
        this.amount = amount;
        this.timestamp = timestamp;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
