package com.example.cerena.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DietPlanRequest {
    private String gender;
    private String age;
    private String height;
    private String weight;
    private String activityLevel;
    private String goal;
    private String dietType;
    private String mealTiming;
    private String allergies;
    private String culturalOrReligiousConsiderations;
    private String medicalConditions;
    private String exerciseIntensity;
    private String beverageConsumption;

    public String getString() {
        return "age:" + age + "," + "gender: " + gender + "height: " + height + "cm" + "weight: " + weight + "kg"
                + "activityLevel: " + activityLevel + "goal: " + goal + "dietType: " + dietType + "mealTiming: "
                + mealTiming + "allergies: " + allergies + "culturalOrReligiousConsiderations: "
                + culturalOrReligiousConsiderations + "medicalConditions: " + medicalConditions + "exerciseIntensity: "
                + exerciseIntensity + "beverageConsumption: " + beverageConsumption;
    }
}

