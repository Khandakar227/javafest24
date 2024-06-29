package com.example.cerena.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.model.Medicine;
import com.example.cerena.model.Response;
import com.example.cerena.model.User;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.MedicineService;
import com.example.cerena.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/medicine")
public class MedicineController {
    @Autowired
    MedicineService medicineService;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @GetMapping

    public ResponseEntity<List<Medicine>> getAllmeed() {
        return new ResponseEntity<List<Medicine>>(
                medicineService.allmed(), HttpStatus.OK);

    }

    @PostMapping
    public ResponseEntity<Response> addMedicine(@RequestBody Medicine medicine,
    HttpServletRequest request) {
    try {
    String authorization = request.getHeader("Authorization");
    String token = authorization.substring(7);
    String email = jwtService.extractEmail(token);
    User user = userService.getUserByEmail(email);
    if (user == null || !jwtService.isTokenValid(token, user) ||
    !user.getRole().equals("ADMIN"))
    return ResponseEntity.status(403).build();

    medicineService.createMedicine(medicine);
    return ResponseEntity.ok(new Response("Medicine added", false));
    } catch (Exception e) {
    System.out.println(e);
    return ResponseEntity.internalServerError().build();
    }
    }

    @PostMapping("/bulk")
    public ResponseEntity<Response> addMedicines(@RequestBody List<Medicine>
    medicines, HttpServletRequest request) {
    try {
    String authorization = request.getHeader("Authorization");
    String token = authorization.substring(7);
    String email = jwtService.extractEmail(token);
    User user = userService.getUserByEmail(email);
    if (user == null || !jwtService.isTokenValid(token, user) ||
    !user.getRole().equals("ADMIN"))
    return ResponseEntity.status(403).build();

    medicineService.addAllMedicines(medicines);

    return ResponseEntity.ok(new Response("Medicines added", false));
    } catch (Exception e) {
    System.out.println(e);
    return ResponseEntity.internalServerError().build();
    }
    }

    /// ......Problem....// @GetMapping("/{id}")
    // public Medicine getMedicineById(@PathVariable String id) {
    // return medicineService.getMedicineById(id);
    // }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Medicine>> getSingleMovie(@PathVariable String id) {
        return new ResponseEntity<Optional<Medicine>>(medicineService.getMedicineById(id), HttpStatus.OK);
    }
    // @GetMapping("/search")
    public Page<Medicine> searchMedicines(@RequestParam String query,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size) {
    Pageable pageable = PageRequest.of(page, size);
    return medicineService.searchMedicines(query, pageable);
    }

    @GetMapping("/type/{type}")
    public Page<Medicine> getMedicinesByType(@PathVariable String type,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return medicineService.getMedicinesByType(type, pageable);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    @GetMapping("/company/{companyName}")
    public Page<Medicine> getMedicinesByCompany(@PathVariable String companyName,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size) {
    Pageable pageable = PageRequest.of(page, size);
    return medicineService.getMedicinesByCompany(companyName, pageable);
    }
}
