package com.example.expense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.UUID;


@Entity
@Table(name="category")
public class Category {


	public Category(Long id, String name, User user) {
		this.id = id;
		this.name = name;
		this.user = user;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String name;

	@JsonIgnore
	@ManyToOne
	private User user;


	// No parameter constructor
	public Category() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}
	// Getters and setters
	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public void setUser(User user) {
		this.user = user;
	}

	public User getUser() {
		return user;
	}


}
