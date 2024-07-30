package com.example.cerena.controller;

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

import com.example.cerena.model.Exercise;
import com.example.cerena.model.Response;
import com.example.cerena.model.User;
import com.example.cerena.service.ExerciseService;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController

@RequestMapping("/api/v1/exercise")
public class ExerciseController {
    @Autowired
    ExerciseService exerciseService;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<Response> addExercise(@RequestBody Exercise exercise, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            exerciseService.createExercise(exercise);

            return ResponseEntity.ok(new Response("Exercise added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<Response> addExercises(@RequestBody List<Exercise> exercises, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            exerciseService.addAllExercises(exercises);

            return ResponseEntity.ok(new Response("Exercises added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable String id) {
        return exerciseService.getExerciseById(id);
    }

    @GetMapping("/search")
    public Page<Exercise> searchExercises(@RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return exerciseService.searchExercises(query, pageable);
    }

    @GetMapping("/muscle/{keyword}")
    public Page<Exercise> getExerciseByMuscle(@PathVariable String keyword, @RequestParam(defaultValue = "") String gender, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return exerciseService.getExerciseByMuscleGp(keyword, gender, pageable);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    @GetMapping("/equipment/{district}")
    public Page<Exercise> getExercisesByEquipment(@PathVariable String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return exerciseService.getExerciseByEquipment(keyword, pageable);
    }

}
