package com.example.cerena.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cerena.model.User;
import com.example.cerena.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthService authService;
    @Autowired
    JwtService jwtService;

    public boolean isEmailInUse(String email) {
        return userRepository.findByEmail(email) != null;
    }
    public void registerUser(User user) {
        user.setVerified(false);
        user.setRole("USER");
        user.setPassword(authService.hashPassword(user.getPassword()));
        userRepository.save(user);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public void updateUser(User user) {
        userRepository.save(user);
    }
    public User getUserFromToken(String token) {
        String email = jwtService.extractEmail(token);
        return userRepository.findByEmail(email);
    }
    
}
