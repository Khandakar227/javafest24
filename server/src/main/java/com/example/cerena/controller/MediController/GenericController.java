package com.example.cerena.controller.MediController;

import com.example.cerena.model.Medicinemodel.Generic;
import com.example.cerena.model.Medicinemodel.Medicine;
import com.example.cerena.repository.MediRepo.*;
import com.example.cerena.service.MediService.GenericService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/generics")
public class GenericController {

    @Autowired
    private GenericService genericService;
     @GetMapping
    public ResponseEntity<List<Generic>> getAllmeed() {
        return new ResponseEntity<List<Generic>>(
                genericService.allGenName(), HttpStatus.OK);

    }

    // Get all generics
    // @GetMapping
    // public List<Generic> getAllGenerics() {
    //     return genericRepository.findAll();
    // }

    //Get a single generic by ID
    // @GetMapping("/{id}")
    // public ResponseEntity<Generic> getGenericById(@PathVariable ObjectId id) {
    //     return genericRepository.findById(id)
    //             .map(ResponseEntity::ok)
    //             .orElse(ResponseEntity.notFound().build());
    // }

    // Create a new generic
    // @PostMapping
    // public Generic createGeneric(@RequestBody Generic generic) {
    //     return genericRepository.save(generic);
    // }

    // Update an existing generic
    // @PutMapping("/{id}")
    // public ResponseEntity<Generic> updateGeneric(@PathVariable ObjectId id, @RequestBody Generic genericDetails) {
    //     return genericRepository.findById(id)
    //             .map(generic -> {
    //                 generic.setGenName(genericDetails.getGenName());
    //                 // set other fields
    //                 return ResponseEntity.ok(genericRepository.save(generic));
    //             })
    //             .orElse(ResponseEntity.notFound().build());
    // }

    // Delete a generic
    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteGeneric(@PathVariable ObjectId id) {
    //     return genericRepository.findById(id)
    //             .map(generic -> {
    //                 genericRepository.delete(generic);
    //                 return ResponseEntity.noContent().build();
    //             })
    //             .orElse(ResponseEntity.notFound().build());
    // }
}
