package com.example.mongodemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.mongodemo.model.Doctor;
import com.example.mongodemo.model.Response;
import com.example.mongodemo.model.User;
import com.example.mongodemo.repository.UserRepository;
import com.example.mongodemo.service.DoctorService;
import com.example.mongodemo.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;
    @Autowired
    JwtService jwtService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/")
    public ResponseEntity<Response> addDoctor(@RequestBody Doctor doctor, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userRepository.findByEmail(email);
            if (user == null || !user.getRole().equals("ADMIN"))
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
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userRepository.findByEmail(email);
            if (user == null || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            doctorService.addAllDoctors(doctors);

            return ResponseEntity.ok(new Response("Doctors added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable String id) {
        return doctorService.getDoctorById(id);
    }

    @GetMapping("/search")
    public Page<Doctor> searchDoctors(@RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return doctorService.searchDoctors(query, pageable);
    }

    @GetMapping("/speciality/{keyword}")
    public Page<Doctor> getDoctorsBySpeciality(@PathVariable String keyword, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
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
}
