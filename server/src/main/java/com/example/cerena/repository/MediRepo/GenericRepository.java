package com.example.cerena.repository.MediRepo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.Medicine.Generic;

@Repository
public interface GenericRepository extends MongoRepository<Generic, String> {
    Optional<Generic> findByName(String name);
    @NonNull Optional<Generic> findById(@NonNull String id);
}
