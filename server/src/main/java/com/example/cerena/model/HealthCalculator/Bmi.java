package com.example.cerena.model.HealthCalculator;

public class Bmi {
    private double height;
    private double weight;
    private double bmi;
    private String category;
   
    private double healthyWeightMin;
    private double healthyWeightMax;
    private double bmiPrime;
    private double ponderalIndex;

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

    public double getBmi() {
        return bmi;
    }

    public void setBmi(double bmi) {
        this.bmi = bmi;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public double getHealthyWeightMin() {
        return healthyWeightMin;
    }

    public void setHealthyWeightRange(double healthyWeightMin, double healthyWeightMax) {
        this.healthyWeightMin = healthyWeightMin;
        this.healthyWeightMax = healthyWeightMax;
    }

    public double getHealthyWeightMax() {
        return healthyWeightMax;
    }

    public double getBmiPrime() {
        return bmiPrime;
    }

    public void setBmiPrime(double bmiPrime) {
        this.bmiPrime = bmiPrime;
    }

    public double getPonderalIndex() {
        return ponderalIndex;
    }

    public void setPonderalIndex(double ponderalIndex) {
        this.ponderalIndex = ponderalIndex;
    }
}
