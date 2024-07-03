package com.example.cerena.repository.MediRepo;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.Medicinemodel.Generic;

@Repository
public interface GenericRepository extends MongoRepository<Generic, ObjectId> {
    Optional<Generic> findByName(String name);
    Generic findById(String id);

    
}
