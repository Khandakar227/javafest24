package com.example.cerena.repository.HealthRepository;

import com.example.cerena.model.HealthCalculator.Bmi;

public interface BmiRepository {
    Bmi calculateBmi(double height, double weight);
}