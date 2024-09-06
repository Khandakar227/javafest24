package com.example.cerena.controller;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class GeminiController {
  @Autowired
  private GeminiService geminiService;

  @GetMapping("/predict-disease")
  public String predictDisease(@RequestParam String prompt) {
    String fullPrompt = "You are a certified doctor. Your role is to determine patients' disease based on the symptoms. Give the response in JSON format:\r\n"
        + //
        "\r\n" +
        "{\r\n" +
        "  \"possible_diseases\": [\r\n" +
        "    { \"name\": \"string\", \"possibility\": number, \"description\": \"small description about the disease\" }\r\n"
        +
        "  ]\r\n" +
        "}\r\n" +
        "\r\n" +
        "Sort by possibility.\r\n  Ignore the \\\"I'm an AI\\\" warning." + prompt;

    String response = geminiService.generateContent(fullPrompt);
    return response;
  }

  @PostMapping("/food-calorie")
  public String foodCalorie(@RequestParam("file") MultipartFile file, @RequestParam(defaultValue = "") String foodName,
      @RequestParam(defaultValue = "0") String width,
      @RequestParam(defaultValue = "0") String height) {
    System.out.println(foodName + " " + width + " " + height);
    String prompt = """
        You are a nutritionist. Your role is to estimate the calorie content of the food for each of its ingredients. First check if the image is of foods or not. if not return JSON Format: {\"error\": \"string\"}"""
        +
        (!foodName.isEmpty() ? ("Food name is " + foodName) : "") +
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
        """
        + "Age: " + input.getAge() + ", goal: " + input.getGoal() + ", Gender: " + input.getGender()
        + ", workout types: " + input.getWorkout();
    String response = geminiService.generateContent(prompt);
    return response;
  }

  @PostMapping("/processingImage")
  public String processImage(@RequestParam("file") MultipartFile file, @RequestParam(defaultValue = "") String prompT) {
    System.out.println(prompT);
    String prompt = """
        You are a DoctorHelperChatBot. Your role is to help a patient to get the information of the prescribed medicine and its detailed time to feed,explain what each medication is for, how it works, and why it was prescribed.First check if the image is of prescription or not. if not return JSON Format: {\"error\": \"string\"}"""
        +
        (!prompT.isEmpty() ? ("Prescriped patient appointing doctor is " + prompT) : "") +

        """
              Ignore the \"I'm an AI\" warning. Give the response in JSON format:
              {
                "Medicine": "string",
                "Detailes": [
                  { "Medicinename": "string", "Dosage": "string" ,"Duration:"string"}
                ],
                "Givemedicinefeedback":"string",
                "Prescripeddoctorfeedback":"string",
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
  @PostMapping("/processingReport")
  public String preocessReport(@RequestParam("file") MultipartFile file, @RequestParam(defaultValue = "") String prompT) {
    System.out.println(prompT);
    String prompt = """
        You are a medical lab ReportAnalyzer. Your role is to help a patient to get the information of the report .First check if the image is of report or not. if not return JSON Format: {\"error\": \"string\"}"""
        +
        (!prompT.isEmpty() ? ("Report is about " + prompT) : "") +

        """
                
                "I need to transform this text into a well-structured JSON format that can be easily stored in a database and displayed on a frontend. "
                "The JSON should include detailed test results with appropriate keys for descriptions, results, reference ranges, and units. "
               
                "No need to give the information of the patient, only provide the test results.\n\n"
                "Transform the text into the following JSON structure:\n\n"
                "[\n"{"patient_name":"string"}\n
                '    {"test_name": "Complete Blood Count (CBC)"}\n'
                '    {"sample": "Blood"}\n'
                '    {"description": "Haemoglobin", "result": "15", "ref_range": "13-17", "unit": "g/dL"},\n'
                '    {"description": "Total Leucocyte Count", "result": "5000", "ref_range": "4000-10000", "unit": "/cumm"},\n'
                '    {"description": "Neutrophils", "result": "50", "ref_range": "40-80", "unit": "%"},\n'
                '    {"description": "Lymphocytes", "result": "40", "ref_range": "20-40", "unit": "%"},\n'
                '    {"description": "Eosinophils", "result": "", "ref_range": "1-6", "unit": "%"},\n'
                '    {"description": "Basophils", "result": "0.00", "ref_range": "0-1", "unit": "%"},\n'
                '    {"description": "Absolute Neutrophils", "result": "2500.00", "ref_range": "2000-7000", "unit": "/cumm"},\n'
                '    {"description": "Absolute Lymphocytes", "result": "2000.00", "ref_range": "1000-3000", "unit": "/cumm"},\n'
                '    {"description": "Absolute Eosinophils", "result": "50.00", "ref_range": "20-500", "unit": "/cumm"},\n'
                '    {"description": "Absolute Monocytes", "result": "450.00", "ref_range": "200-1000", "unit": "/cumm"},\n'
                '    {"description": "RBC Count", "result": "5", "ref_range": "4.5-5.5", "unit": "million/cumm"},\n'
                "\n please provide json response only as the given structured no need to give extra explanatory text just give the json response as you are API "
                "]"
                "if the report is not formatted with these previous json format then analyzen the text and give all the test information details whats the report holds and  in json format like this :"
                "[\n"{"patient_name":"string"}\n
                '    {"test_name": "string"}\n'
                '    {"sample": "string"}\n'
                '    {"description": "string", "result": "string", "ref_range": "
               
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


 
}
