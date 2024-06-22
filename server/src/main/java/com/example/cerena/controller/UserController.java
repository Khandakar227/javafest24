package com.example.cerena.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.model.JwtTokenResponse;
import com.example.cerena.model.Response;
import com.example.cerena.model.User;
import com.example.cerena.service.AuthService;
import com.example.cerena.service.EmailService;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;
    @Autowired
    JwtService jwtService;
    @Autowired
    AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Response> signup(@RequestBody User user) {
        try {
            userService.registerUser(user);

            // Send verification email
            String verifyToken = jwtService.generateMailVerificationToken(user.getEmail());
            emailService.sendVerificationEmail(user.getName(), user.getEmail(), verifyToken);

            Response response = new Response("User registered successfully", false);
            return ResponseEntity.ok(response);
        } catch (DuplicateKeyException e) {
            System.out.println("DuplicateKeyException: " + e.getMessage());
            Response response = new Response("Email already in use", true);
            return ResponseEntity.status(409).body(response);
        } catch (Exception e) {
            System.out.println(e);
            Response response = new Response("User registration failed", true);

            return ResponseEntity.internalServerError().body(response);
        }
    }
    @GetMapping("/resend-verification-mail")
    public ResponseEntity<Response> resendVerificationMail(@RequestParam String email) {
        try {
            User user = userService.getUserByEmail(email);
            if (user == null)
                return ResponseEntity.ok().build();
            if (user.isVerified())
                return ResponseEntity.ok().build();
            String token = jwtService.generateMailVerificationToken(email);
            emailService.sendVerificationEmail(user.getName(), email, token);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println(e);
            Response response = new Response("Failed to resend verification email", true);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody User user) {
        try {
            User existingUser = userService.getUserByEmail(user.getEmail());

            if (existingUser == null) {
                Response response = new Response("Invalid email or password", true);
                return ResponseEntity.status(401).body(response);
            }
            if (!authService.checkPassword(user.getPassword(), existingUser.getPassword())) {
                Response response = new Response("Invalid password", true);
                return ResponseEntity.status(401).body(response);
            }
            if (!existingUser.isVerified()) {
                Response response = new Response("Your account is not verified. Please check your mail to verify your email", true);
                return ResponseEntity.status(401).body(response);
            }
            String token = jwtService.generateUserToken(existingUser);
            JwtTokenResponse response = new JwtTokenResponse("Login successful", false, token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e);
            Response response = new Response("Login failed", true);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/verify")
    public String verify(@RequestParam String token) {
        try {
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            
            if (user == null) {
                return "User not found";
            }
            if (user.isVerified()) {
                return "User already verified";
            }
            user.setVerified(true);
            userService.updateUser(user);
            return "User verified successfully";
        } catch (Exception e) {
            System.out.println(e);
            return "Verification failed";
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<User> profile(HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            if(!jwtService.isTokenValid(token, user))
                return ResponseEntity.status(403).build();
            if (user == null)
                return ResponseEntity.notFound().build();
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Response> update(@RequestBody User user, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);

            User existingUser = userService.getUserByEmail(email);

            if (existingUser == null) {
                Response response = new Response("User not found", true);
                return ResponseEntity.status(404).body(response);
            }
            if (user.getName() != null)
                existingUser.setName(user.getName());
            userService.updateUser(existingUser);
            Response response = new Response("User updated successfully", false);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println(e);
            Response response = new Response("User update failed", true);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/send-password-reset-mail")
    public ResponseEntity<Response> sendPasswordResetMail(@RequestParam String email) {
        try {
            User user = userService.getUserByEmail(email);
            if (user == null)
                return ResponseEntity.ok().build();
            String token = jwtService.generatePasswordResetToken(email);
            emailService.sendPasswordResetEmail(user.getName(), email, token);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println(e);
            Response response = new Response("Failed to send password reset email", true);
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/reset-password/{token}")
    public ResponseEntity<byte[]> resetPassword(@PathVariable String token) {
        try {
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            
            if (user == null)
                return ResponseEntity.status(404).build();

            Resource resource = new ClassPathResource("static/reset-password-form.html");
            Path path = Paths.get(resource.getURI());
            byte[] htmlBytes = Files.readAllBytes(path);
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_HTML)
                    .body(htmlBytes);

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/reset-password/{token}")
    public String resetPassword(@PathVariable String token, @RequestParam String password) {
        try {
            String email = jwtService.extractEmail(token);
            User existingUser = userService.getUserByEmail(email);
            
            if (existingUser == null) {
                return "User not found";
            }
            System.out.println(password);
            existingUser.setPassword(authService.hashPassword(password));
            userService.updateUser(existingUser);
            return "Password reset successful";
        } catch (Exception e) {
            System.out.println(e);
            return "Password reset failed";
        }
    }

}
