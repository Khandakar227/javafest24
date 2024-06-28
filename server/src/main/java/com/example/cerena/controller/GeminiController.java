package com.example.cerena.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.service.GeminiService;

@RestController
@RequestMapping("/api/ai")
public class GeminiController {
    @Autowired
    private GeminiService geminiService;

    @GetMapping("/predict-disease")
    public String predictDisease(@RequestParam String prompt) {
        
        return geminiService.generateContent(prompt);
    }
}
