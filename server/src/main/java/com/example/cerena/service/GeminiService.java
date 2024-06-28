package com.example.cerena.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.cerena.model.GeminiRequestBody;
import com.example.cerena.model.GeminiResponse;
import com.example.cerena.model.InlineData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class GeminiService {
    @Value("${gemini.api}")
    private String apiKey;

    @Autowired
    private RestTemplate restTemplate;

    public String generateContent(String prompt) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" + apiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ObjectMapper objectMapper = new ObjectMapper();
        GeminiRequestBody geminiRequestBody = new GeminiRequestBody(prompt, null);
        try {
            String requestBody = objectMapper.writeValueAsString(geminiRequestBody);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            System.out.println(requestBody);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    
            String body = response.getBody();
            GeminiResponse res = objectMapper.readValue(body, GeminiResponse.class);
            return (String) res.getCandidates().get(0).getContent().getParts().get(0).getText();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String generateContentFromImage(String base64Image, String prompt, String mimeType) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" + apiKey;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ObjectMapper objectMapper = new ObjectMapper();
        InlineData inlineData = new InlineData(base64Image, mimeType);
        GeminiRequestBody geminiRequestBody = new GeminiRequestBody(prompt, inlineData);
        try {
            String requestBody = objectMapper.writeValueAsString(geminiRequestBody);
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
    
            String body = response.getBody();
            GeminiResponse res = objectMapper.readValue(body, GeminiResponse.class);
            return (String) res.getCandidates().get(0).getContent().getParts().get(0).getText();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

}
