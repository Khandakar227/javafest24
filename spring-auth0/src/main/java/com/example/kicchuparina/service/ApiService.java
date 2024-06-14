package com.example.kicchuparina.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.security.core.Authentication;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.kicchuparina.controller.AuthController;
import com.example.kicchuparina.model.LoggedInUser;

@Service
public class ApiService {
    
    @Autowired
    private AuthController controller;

    public ResponseEntity<String> getCall(String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + controller.getManagementApiToken());
        HttpEntity<String> entity = new HttpEntity<String>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return result;
    }
    
    public ResponseEntity<String> postCall(String url, String requestBody) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer "+controller.getManagementApiToken());
        
        HttpEntity<String> request = new HttpEntity<String>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.postForEntity(url, request, String.class);
        
        return result;
    }
    
    public LoggedInUser getLoggedInUser(Authentication authentication) {
        if (authentication!= null && authentication instanceof TestingAuthenticationToken) {
            TestingAuthenticationToken token = (TestingAuthenticationToken) authentication;
            
            DecodedJWT jwt = JWT.decode(token.getCredentials().toString());
            System.out.println(jwt.getClaims().toString());
            LoggedInUser user = new LoggedInUser(jwt.getClaims().get("email").asString(), jwt.getSubject(), jwt.getClaims().get("sid").asString(), jwt.getClaims().get("email_verified").asBoolean());
            
            return user;
        }

        return null;
    }
}
