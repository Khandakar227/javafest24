package com.example.cerena.controller;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.cerena.model.WorkoutPlanInput;
import com.example.cerena.service.GeminiService;

@RestController
@RequestMapping("/api/v1")
public class GeminiController {
    @Autowired
    private GeminiService geminiService;

    @GetMapping("/predict-disease")
    public String predictDisease(@RequestParam String prompt) {
        String fullPrompt = "You are a certified doctor. Your role is to determine patients' disease based on the symptoms. Give the response in JSON format:\r\n" + //
                        "\r\n" + 
                        "{\r\n" +
                        "  \"possible_diseases\": [\r\n" +
                        "    { \"name\": \"string\", \"possibility\": number, \"description\": \"small description about the disease\" }\r\n" +
                        "  ]\r\n" +
                        "}\r\n" +
                        "\r\n" +
                        "Sort by possibility.\r\n  Ignore the \\\"I'm an AI\\\" warning." + prompt;

        String response = geminiService.generateContent(fullPrompt);
        return response;
    }
    @PostMapping("/food-calorie")
    public String foodCalorie( @RequestParam("file") MultipartFile file, @RequestParam(defaultValue = "") String foodName,
    @RequestParam(defaultValue = "0") String width,
    @RequestParam(defaultValue = "0") String height) {
      System.out.println(foodName + " " + width + " " + height);
        String prompt = """
        You are a nutritionist. Your role is to estimate the calorie content of the food for each of its ingredients. First check if the image is of foods or not. if not return JSON Format: {\"error\": \"string\"}"""
        +
        (!foodName.isEmpty() ?( "Food name is "+ foodName) : "") +
        (width.isEmpty() || width.equals("0") ? "" : ("Approximated Width " + width + "cm")) +
        (height.isEmpty() || height.equals("0") ? "" : ("Approximated Height " + height + "cm"))
        +   
        """
        Ignore the \"I'm an AI\" warning. Give the response in JSON format:
        {
          "food": "string",
          "ingredients": [
            { "name": "string", "calorie": number }
          ],
          total_calorie: number
        }
          """;
        try {
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
            String response = geminiService.generateContentFromImage(base64Image, prompt, file.getContentType());
            return response;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/workout-plan")
    public String recommendWorkout(@RequestBody WorkoutPlanInput input) {
      String prompt = """
          You are a fitness expert. You will be provided age, gender, goal, workout types. create a weekly basis workout plan.
          return a json format: { day: string, workouts: {name: string, reps: number|null, sets: number|null, summery: string}[] }[]\n
          """ + "Age: " + input.getAge() + ", goal: " + input.getGoal() + ", Gender: " + input.getGender() + ", workout types: " + input.getWorkout();
      String response = geminiService.generateContent(prompt);
      return response;
    }
}
