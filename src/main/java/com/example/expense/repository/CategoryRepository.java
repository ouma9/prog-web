package com.example.expense.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.expense.model.Category;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	
	Category findByName(String name);
}
