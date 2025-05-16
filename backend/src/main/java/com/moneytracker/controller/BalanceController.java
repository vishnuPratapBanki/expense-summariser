package com.moneytracker.controller;

import com.moneytracker.model.Balance;
import com.moneytracker.model.Transaction;
import com.moneytracker.repository.BalanceRepository;
import com.moneytracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BalanceController {

    @Autowired
    private BalanceRepository balanceRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    private Balance getBalanceDoc() {
        return balanceRepo.findById("singleton").orElseGet(() -> {
            Balance b = new Balance();
            b.setId("singleton");
            b.setFamilyMoney(0.0);
            b.setHiddenSavings(0.0);
            return balanceRepo.save(b);
        });
    }

    @GetMapping("/balance")
    public Balance getBalance() {
        return getBalanceDoc();
    }

    @PostMapping("/balance/{category}/{action}")
    public Balance update(@PathVariable String category, @PathVariable String action, @RequestParam Double amount) {
        Balance b = getBalanceDoc();

        if (category.equals("family")) {
            b.setFamilyMoney(action.equals("add") ? b.getFamilyMoney() + amount : b.getFamilyMoney() - amount);
        } else if (category.equals("savings")) {
            b.setHiddenSavings(action.equals("add") ? b.getHiddenSavings() + amount : b.getHiddenSavings() - amount);
        }

        // Save balance
        Balance updatedBalance = balanceRepo.save(b);

        // Save transaction record
        Transaction txn = new Transaction(category, action, amount, LocalDateTime.now());
        transactionRepo.save(txn);

        return updatedBalance;
    }

    // New API endpoint to fetch all transactions
    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionRepo.findAllByOrderByTimestampDesc();
    }
}
