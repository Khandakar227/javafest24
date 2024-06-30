package com.example.cerena.repository.MediRepo;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


import com.example.cerena.model.Medicinemodel.Medicine;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, ObjectId> {
    Medicine findByName(String name);
    //Medicine findById(ObjectId id);
    Optional<Medicine> findById(String id);
    
    @Query("{ 'Type': { $regex: ?0, $options: 'i' } }")
    Page<Medicine> findByType(String type, Pageable pageable);
     @Field(name = "manufacturer")
    @Query("{ 'manufacturer': { $regex: ?0, $options: 'i' } }")
    Page<Medicine> findByCompanyName(String manufacturer, Pageable pageable);

    Page<Medicine> findAllBy(TextCriteria criteria, Pageable pageable);
    
}

