package com.example.mongodemo.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.mongodemo.model.User;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }


    // public String generateToken(String subject, Map<String, Object> extraClaims) {
    //     return buildToken(extraClaims, subject, jwtExpiration);
    // }
    public String generateMailVerificationToken(String email) {
        HashMap<String, Object> claims = new HashMap<>();
        return buildToken(claims, email, jwtExpiration);
    }
    public String generateUserToken(User user) {     
            HashMap<String, Object> claims = new HashMap<>();
            claims.put("role", user.getRole());
            claims.put("verified", user.isVerified());
            claims.put("name", user.getName());
            return buildToken(claims, user.getEmail(), jwtExpiration);
   
    }
    public String generatePasswordResetToken(String email) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("reset", true);
        return buildToken(claims, email, jwtExpiration);
    }
    public long getExpirationTime() {
        return jwtExpiration;
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            String subject,
            long expiration
    ) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));  
        return Jwts.builder()
        .subject(subject)
        .claims(extraClaims)
        .signWith(key)
        .compact();
    }

    public boolean isTokenValid(String token, User user) {
        final String email = extractEmail(token);
        return (email.equals(user.getEmail())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
