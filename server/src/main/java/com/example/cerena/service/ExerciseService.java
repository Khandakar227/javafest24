package com.example.cerena.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Exercise;
import com.example.cerena.repository.ExerciseRepository;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;

    public Page<Exercise> searchExercises(String searchText, Pageable pageable) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
        return exerciseRepository.findAllBy(criteria, pageable);
    }

    public Exercise getExerciseById(String id) {
        return exerciseRepository.findById(id).orElse(null);
    }

    public Page<Exercise> getExerciseByMuscleGp(String speciality, Pageable pageable) {
        return exerciseRepository.findByMuscleGp(speciality, pageable);
    }

    public Page<Exercise> getExerciseByEquipment(String district, Pageable pageable) {
        return exerciseRepository.findByEquipment(district, pageable);
    }

    public Exercise createExercise(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }

    public List<Exercise> addAllExercises(List<Exercise> exercises) {
        return exerciseRepository.saveAll(exercises);
    }
}
