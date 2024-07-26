package com.example.cerena.controller.HealthController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.model.HealthCalculator.Bmi;
import com.example.cerena.service.HealthService.BmiService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/bmi")
public class BmiController {
    @Autowired
    private BmiService bmiService;
    @GetMapping
    public String getBmi() {
        return "BMI ";
    }
    @PostMapping
    public Bmi calculateBmi(@RequestBody BmiRequest request) {
        return bmiService.calculateBmi(request.getHeight(), request.getWeight());
    }
}

class BmiRequest {
    private double height;
    private double weight;

    // getters and setters
    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }
}