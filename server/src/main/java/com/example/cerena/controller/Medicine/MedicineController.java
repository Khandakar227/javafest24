package com.example.cerena.controller.Medicine;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.cerena.model.Response;
import com.example.cerena.model.User;
import com.example.cerena.model.Medicine.FullMedicine;
import com.example.cerena.model.Medicine.Generic;
import com.example.cerena.model.Medicine.Medicine;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.UserService;
import com.example.cerena.service.Medicine.GenericService;
import com.example.cerena.service.Medicine.MedicineService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/medicine")
@CrossOrigin(origins = "*")
public class MedicineController {
    @Autowired
    MedicineService medicineService;
    @Autowired
    GenericService genericService;

    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @GetMapping
    public Page<Medicine> getAllMedicines(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return medicineService.getAllMedicines(pageable);
    }

    @PostMapping
    public ResponseEntity<Response> addMedicine(@RequestBody Medicine medicine,
            HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if(authorization == null) return ResponseEntity.status(403).build();
            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);
            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            medicineService.createMedicine(medicine);
            return ResponseEntity.ok(new Response("Medicine added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<Response> addMedicines(@RequestBody List<Medicine> medicines, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if(authorization == null) return ResponseEntity.status(403).build();
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

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Medicine>> getMedicine(@PathVariable String id) {
        return new ResponseEntity<Optional<Medicine>>(medicineService.getMedicineById(id), HttpStatus.OK);
    }

    @GetMapping("/generic/{id}")
    public ResponseEntity<Optional<Generic>> getGenericById(@PathVariable String id) {
        Optional<Generic> generic = genericService.getGenericById(id);
        if (generic.isPresent()) {
            return new ResponseEntity<>(generic, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // eta search krbe id wise doc er generic details
    @GetMapping("/{id}/generic")
    public ResponseEntity<Optional<Generic>> getGenericByMedicineId(@PathVariable String id) {
        Optional<Medicine> medicineOptional = medicineService.getMedicineById(id);
        if (medicineOptional.isPresent()) {
            Medicine medicine = medicineOptional.get();
            String genericName = medicine.getGeneric();
            Optional<Generic> generic = genericService.getGenericByName(genericName);
            return new ResponseEntity<>(generic, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Optional.empty(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public Page<Medicine> searchMedicines(@RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return medicineService.search(query, pageable);
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

    @GetMapping("/company/{manufacturer}")
    public Page<Medicine> getMedicinesByCompany(@PathVariable String manufacturer,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return medicineService.getMedicinesByCompany(manufacturer, pageable);
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<FullMedicine> getMedicineBySlug(@PathVariable String slug) {
        Optional<Medicine> medicineOptional = medicineService.getMedicineBySlug(slug);
        if(medicineOptional.isPresent()) {
            Medicine medicine = medicineOptional.get();
            String genericName = medicine.getGeneric();
            Optional<Generic> generic = genericService.getGenericByName(genericName);
            FullMedicine fullMedicine = new FullMedicine(medicine, generic.get());
            return new ResponseEntity<>(fullMedicine, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
     
    
    @GetMapping("/count")
    public ResponseEntity<?> countMedicines() {
        Map<String, Long> response = new HashMap<>();
        response.put("count", medicineService.countMedicines());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/alternatives/{generic}")
    public Page<Medicine> searchAlternativeBrands(
            @PathVariable String generic,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        
        String decodedGeneric = generic.replace("-", " ");
        return medicineService.searchBygeneric(decodedGeneric, pageable);
    }

        // Delete a generic
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Response> deleteGeneric(@PathVariable String id) {
        medicineService.deleteById(id);
        Response response = new Response("Medicine deleted", false);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
