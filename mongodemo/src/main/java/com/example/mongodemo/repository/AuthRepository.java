package com.example.mongodemo.repository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public class AuthRepository {
   public String hashPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);

        return encoder.encode(password);
    }
    public boolean checkPassword(String password, String hashedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        return encoder.matches(password, hashedPassword);
    }
}
