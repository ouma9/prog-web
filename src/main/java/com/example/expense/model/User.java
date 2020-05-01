package com.example.expense.model;


import javax.persistence.*;


@Entity
@Table(name="user")
public class User {

    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    private String  name;

    private String email;

    public User() {
    }

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getEmail() { return email; }

    public void setId(Long id) { this.id = id; }

    public void setName(String name) { this.name = name; }

    public void setEmail(String email) { this.email = email; }


}