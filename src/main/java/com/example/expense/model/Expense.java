package com.example.expense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.Instant;

import javax.persistence.*;

@Entity
@Table(name="expense")
public class Expense {


	@GeneratedValue(strategy = GenerationType.AUTO)
	@Id
	private Long id;

	public Expense(Long id, Instant expensedate, String description, String location, Category category, User user) {
		this.id = id;
		this.expensedate = expensedate;
		this.description = description;
		this.location = location;
		this.category = category;
		this.user = user;
	}

	private Instant expensedate;

	private String description;

	private String location;


	@ManyToOne()
	private Category category;



	@JsonIgnore
	@ManyToOne
	private User user;


	// No parameter constructor
	public Expense() {
	}



	// Getters and setters

	public String getDescription() { return description; }

	public void setDescription(String description) { this.description = description; }

	public Instant getExpensedate() {
		return expensedate;
	}

	public void setExpensedate(Instant expensedate) {
		this.expensedate = expensedate;
	}

	public Long getId() {
		return id;
	}

	public Category getCategory() {
		return category;
	}

	public void setId(Long id) {this.id = id; }

	public void setCategory(Category category) {
		this.category = category;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}



}
