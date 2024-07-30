package com.example.cerena.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class WorkoutPlanInput {
   private String age;
   private String gender;
   private String goal;
   private String workout;
}
