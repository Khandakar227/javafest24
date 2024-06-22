package com.example.cerena.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
   public String hashPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);

        return encoder.encode(password);
    }
    public boolean checkPassword(String password, String hashedPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        return encoder.matches(password, hashedPassword);
    }
}
