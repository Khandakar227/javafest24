package com.example.cerena.service.Medicine;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Medicine.Generic;
import com.example.cerena.repository.MediRepo.GenericRepository;

@Service
public class GenericService {

  @Autowired
  private GenericRepository genericRepository;
  @Autowired
  private MongoTemplate mongoTemplate;

  public List<Generic> allGenericName() {
    return genericRepository.findAll();
  }

  public Optional<Generic> getGenericByName(String name) {
    return genericRepository.findByName(name);
  }

  public Generic createGeneric(Generic generic) {
    return genericRepository.save(generic);
  }

  public List<Generic> addAllGenerics(List<Generic> generic) {
    return genericRepository.saveAll(generic);
  }

  public Optional<Generic> getGenericById(String id) {
    return genericRepository.findById(id);
  }

  public long countGenerics() {
    return genericRepository.count();
  }

  public List<String> getDistinctDrugClass() {
    return mongoTemplate.query(Generic.class)
        .distinct("drugClass")
        .as(String.class)
        .all();
  }

  public List<String> getDistinctGenerics() {
    return mongoTemplate.query(Generic.class)
        .distinct("name")
        .as(String.class)
        .all();
  }
  
  public void deleteById(String id) {
    genericRepository.deleteById(id);
  }

}
