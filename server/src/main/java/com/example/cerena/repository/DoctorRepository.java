package com.example.cerena.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.Doctor;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor, String> {
    Doctor findByName(String name);
    
    @Query("{ 'speciality': { $regex: ?0, $options: 'i' } }")
    Page<Doctor> findBySpeciality(String speciality, Pageable pageable);
    
    @Query("{ 'district': { $regex: ?0, $options: 'i' } }")
    Page<Doctor> findByDistrict(String district, Pageable pageable);

    @Query("{ 'district': { $regex: ?0, $options: 'i' }, 'speciality': { $regex: ?1, $options: 'i' } }")
    Page<Doctor> findAllBy(String district, String speciality, Pageable pageable);
    Page<Doctor> findAllBy(TextCriteria criteria, Pageable pageable);
}