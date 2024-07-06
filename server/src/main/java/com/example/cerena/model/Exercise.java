package com.example.cerena.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document("exercises")
@Setter @Getter
public class Exercise {
    @Id
    private String id;
    @TextIndexed private String excerciseName;
    @TextIndexed private String muscleGp;
    @TextIndexed private String equipment;
    private float rating;
    private String description;
    private String benefits;
    private List<String> img;

    public Exercise(String excerciseName, String muscleGp, String equipment, float rating, String description, String benefits, List<String> img) {
        super();
        this.excerciseName = excerciseName;
        this.muscleGp = muscleGp;
        this.equipment = equipment;
        this.rating = rating;
        this.description = description;
        this.benefits = benefits;
        this.img = img;
    }
}
