package com.example.cerena.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.model.Doctor;
import com.example.cerena.model.Response;
import com.example.cerena.model.User;
import com.example.cerena.service.DoctorService;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<Response> addDoctor(@RequestBody Doctor doctor, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if(authorization == null) return ResponseEntity.status(403).build();
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            doctorService.createDoctor(doctor);
            return ResponseEntity.ok(new Response("Doctor added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<Response> addDoctors(@RequestBody List<Doctor> doctors, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if(authorization == null) return ResponseEntity.status(403).build();
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            doctorService.addAllDoctors(doctors);

            return ResponseEntity.ok(new Response("Doctors added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping
    public Page<Doctor> getAllDoctor(
        @RequestParam(defaultValue = "") String query,
        @RequestParam(defaultValue = "") String district,
        @RequestParam(defaultValue = "") String speciality,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "21") int size,
        @RequestParam(defaultValue = "name") String sortField,
        @RequestParam(defaultValue = "ASC") Sort.Direction direction) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));
        System.out.println(query);
        return doctorService.findAllDoctors(district, speciality, query, pageable);
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable String id) {
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/search")
    public Page<Doctor> searchDoctors(@RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "21") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return doctorService.searchDoctors(query, pageable);
    }

    @GetMapping("/speciality/{keyword}")
    public Page<Doctor> getDoctorsBySpeciality(@PathVariable String keyword, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "21") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return doctorService.getDoctorsBySpeciality(keyword, pageable);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/district/{district}")
    public Page<Doctor> getDoctorsByDistrict(@PathVariable String district,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return doctorService.getDoctorsByDistrict(district, pageable);
    }

    @GetMapping("/count")
    public ResponseEntity<?> countDoctors() {
        Map<String, Long> response = new HashMap<>();
        response.put("count", doctorService.countDoctors());
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Response> deleteById(@PathVariable String id, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if (authorization == null)
                return ResponseEntity.status(403).build();

            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);

            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            doctorService.deleteEntry(id);
            return ResponseEntity.ok(new Response("Doctor Info deleted", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<Doctor> updateSign(@PathVariable String id, @RequestBody Doctor entry,
            HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if (authorization == null)
                return ResponseEntity.status(403).build();

            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);

            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

           Doctor updatedEntry = doctorService.updateById(entry);
            return new ResponseEntity<>(updatedEntry, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
