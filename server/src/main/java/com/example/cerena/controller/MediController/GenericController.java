package com.example.cerena.controller.MediController;

import com.example.cerena.model.Response;
import com.example.cerena.model.User;
import com.example.cerena.model.Medicinemodel.Generic;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.UserService;
import com.example.cerena.service.MediService.GenericService;
import java.util.Optional;
import jakarta.servlet.http.HttpServletRequest;

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

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<Generic>> getAllGenerics() {
        return new ResponseEntity<List<Generic>>(
                genericService.allGenericName(), HttpStatus.OK);

    }

    // Get a single generic by ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Generic>> getGenericById(@PathVariable String id) {
        return new ResponseEntity<Optional<Generic>>(genericService.getGenericById(id), HttpStatus.OK);
    }

    @PostMapping("/bulk")
    public ResponseEntity<Response> addGenerics(@RequestBody List<Generic> generic, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if (authorization == null)
                return ResponseEntity.status(403).build();
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            if (user == null || !jwtService.isTokenValid(token, user) ||
                    !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            genericService.addAllGenerics(generic);

            return ResponseEntity.ok(new Response("Generics added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    // Update an existing generic
    // @PutMapping("/{id}")
    // public ResponseEntity<Generic> updateGeneric(@PathVariable ObjectId id,
    // @RequestBody Generic genericDetails) {
    // return genericRepository.findById(id)
    // .map(generic -> {
    // generic.setGenName(genericDetails.getGenName());
    // // set other fields
    // return ResponseEntity.ok(genericRepository.save(generic));
    // })
    // .orElse(ResponseEntity.notFound().build());
    // }

    // Delete a generic
    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deleteGeneric(@PathVariable ObjectId id) {
    // return genericRepository.findById(id)
    // .map(generic -> {
    // genericRepository.delete(generic);
    // return ResponseEntity.noContent().build();
    // })
    // .orElse(ResponseEntity.notFound().build());
    // }
}
