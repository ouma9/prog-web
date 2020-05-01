package com.example.expense.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.expense.model.Category;
import com.example.expense.repository.CategoryRepository;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CategoryController {
	private CategoryRepository categoryRepository;
	
	public CategoryController(CategoryRepository categoryRepository) {
		super();
		this.categoryRepository = categoryRepository;
		
	}
	
	@GetMapping("/categories")
	Collection <Category> categories(){
		return categoryRepository.findAll();
	}
	
	@GetMapping("/category/{id}")
	ResponseEntity<?> getCategory(@PathVariable Long id){
	Optional<Category> category = categoryRepository.findById(id);
	 return category.map(response -> ResponseEntity.ok().body(response))
			 .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	 
	}
	@PostMapping("/categories")
	ResponseEntity<Category> createCategory(@RequestBody Category category) throws URISyntaxException{
	  Category result= categoryRepository.save(category);
	  return ResponseEntity.created(new URI("/categories" + result.getId())).body(result);
	
	}
	
	
	@PutMapping("/category/{id}")
	ResponseEntity<Category> updateCategory(@RequestBody Category category){
		Category result= categoryRepository.save(category);
		return ResponseEntity.ok().body(result);
	}
	
	
	
	@DeleteMapping("/categories/{id}")
	ResponseEntity<?> deleteCategory(@PathVariable Long id){

		categoryRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
