package com.example.cerena.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.Exercise;

@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    Exercise findByExcerciseName(String excerciseName);

    @Query("{ 'muscleGp': { $regex: ?0, $options: 'i' }, 'gender': ?1 }")
    Page<Exercise> findByMuscleGp(String muscleGp, String gender, Pageable pageable);

    @Query("{ 'equipment': { $regex: ?0, $options: 'i' } }")
    Page<Exercise> findByEquipment(String equipment, Pageable pageable);

    Page<Exercise> findAllBy(TextCriteria criteria, Pageable pageable);
}
