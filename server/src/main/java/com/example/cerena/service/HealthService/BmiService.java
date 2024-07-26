package com.example.cerena.service.HealthService;

import org.springframework.stereotype.Service;

import com.example.cerena.model.HealthCalculator.Bmi;
import com.example.cerena.repository.HealthRepository.BmiRepository;

@Service
public class BmiService implements BmiRepository {
    @Override
    // Height in meter, weight in Kg
    public Bmi calculateBmi(double height, double weight) {
        Bmi bmi = new Bmi();
        bmi.setHeight(height);
        bmi.setWeight(weight);

        double bmiValue = (weight / Math.pow(height, 2));
        bmi.setBmi(bmiValue);

        if (bmiValue < 18.5)
            bmi.setCategory("Underweight");
        else if (bmiValue < 25)
            bmi.setCategory("Normal weight");
        else if (bmiValue < 30)
            bmi.setCategory("Overweight");
        else if (bmiValue < 35)
            bmi.setCategory("Obese Class I");
        else if (bmiValue < 40)
            bmi.setCategory("Obese Class II");
        else
            bmi.setCategory("Obese Class III");
        
        double healthyWeightMin = 18.5 * Math.pow(height, 2);
        double healthyWeightMax = 25 * Math.pow(height, 2);
        bmi.setHealthyWeightRange(healthyWeightMin, healthyWeightMax);

        double bmiPrime = bmiValue*0.0001/ 25;
        bmi.setBmiPrime(bmiPrime);

        double ponderalIndex = bmiValue*0.0001 / Math.pow(height, 3);
        bmi.setPonderalIndex(ponderalIndex);

        return bmi;
    }
}