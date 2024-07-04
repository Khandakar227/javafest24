package com.example.cerena.service.Medicine;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Medicine.Generic;
import com.example.cerena.repository.MediRepo.GenericRepository;

@Service
public class GenericService {

  @Autowired
  private GenericRepository genericRepository;

  public List<Generic> allGenericName() {
    return genericRepository.findAll();
  }

  public Optional<Generic> getGenericById(ObjectId id) {
    return Optional.of(genericRepository.findById(id).orElse(null));
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
    return Optional.of(genericRepository.findById(id));
  }

}
