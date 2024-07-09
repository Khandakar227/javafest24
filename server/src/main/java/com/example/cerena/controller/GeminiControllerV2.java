package com.example.cerena.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.model.QnA;
import com.example.cerena.service.GeminiService;

@RestController
@RequestMapping("/api/v2")
public class GeminiControllerV2 {
    @Autowired
    private GeminiService geminiService;

    @PostMapping("/predict-disease")
    public String predictDisease(@RequestParam String prompt, @RequestBody List<QnA> previousResponse) {
        String fullPrompt = "You are a certified doctor. Your role is to determine patients' disease based on the symptoms." +
        "If the symptoms are not enough then ask questions related to it. This response json format is { 'question': 'string' } Otherwise send Give the response in JSON format:\r\n"
                + 
                "\r\n" +
                "{\r\n" +
                "  'possible_diseases': [\r\n" +
                "    { 'name': 'string', 'possibility': number, 'description': 'small description about the disease' }\r\n"
                +
                "  ]\r\n" +
                "}\r\n" +
                "\r\n" +
                "Sort by possibility.\r\n  Ignore the 'I'm an AI' warning." +
                (previousResponse.size() > 0 ? "\\r\\nHere's previous responses:" + getResponseText(previousResponse) : "")
                + prompt;

        String response = geminiService.generateContent(fullPrompt);
        return response;
    }

    String getResponseText(List<QnA> previousResponse) {
        StringBuilder sb = new StringBuilder();
        for (QnA qna : previousResponse) {
            sb.append("Question: " + qna.getQuestion());
            sb.append("\n");
            sb.append("Question: " + qna.getAnswer());
            sb.append("\n");
        }
        return sb.toString();
    }
}
