package com.example.cerena.controller.HealthController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.model.HealthCalculator.Bmi;
import com.example.cerena.service.HealthService.BmiService;

import lombok.Getter;
import lombok.Setter;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/bmi")
public class BmiController {
    @Autowired
    private BmiService bmiService;
    
    @GetMapping
    public Bmi calculateBmi(@RequestParam double height, @RequestParam double weight) {
        return bmiService.calculateBmi(height, weight);
    }
}
@Getter @Setter
class BmiRequest {
    private double height;
    private double weight;
}