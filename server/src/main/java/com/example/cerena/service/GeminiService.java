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

        String requestBody = "{\n" +
                "    \"contents\": [{\n" +
                "      \"parts\":[\n" +
                "        {\"text\": \" You are a doctor, you are given symptoms of a patient. Determine the disease, ignore the I'm an AI warning. Give the response in json format {possible_diseases: { name: string, possibility: number }[]} sort by possibility"+ prompt +" \"}\n" +
                "      ]\n" +
                "    }],\n" +
                "    \"generationConfig\": {\n" +
                "        \"response_mime_type\": \"application/json\"\n" +
                "    }\n" +
                "}";

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        return response.getBody();
    }

}
