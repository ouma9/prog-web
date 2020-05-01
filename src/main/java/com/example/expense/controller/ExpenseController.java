package com.example.expense.controller;


import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.expense.model.Expense;
import com.example.expense.repository.ExpenseRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/expenses")
    List<Expense> getExpenses(){
        return expenseRepository.findAll();
    }

    @DeleteMapping("/expenses/{id}")
    ResponseEntity<?>  deleteExpense(@PathVariable Long id){
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/expenses")
    ResponseEntity<Expense> createExpense(@RequestBody Expense expense) throws URISyntaxException{
        Expense result= expenseRepository.save(expense);
        return ResponseEntity.created(new URI("/api/expenses" + result.getId())).body(result);
    }
}