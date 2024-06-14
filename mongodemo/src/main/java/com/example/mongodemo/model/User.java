package com.example.mongodemo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document("users")
@Getter @Setter
public class User {
    @Id
    private String id;

    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String role;
    private boolean verified;

    public User( String name, String email, String password, String role, boolean verified ) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.verified = verified;
    }


}
