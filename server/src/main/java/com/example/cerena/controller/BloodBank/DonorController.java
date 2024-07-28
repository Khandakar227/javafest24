package com.example.cerena.controller.BloodBank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cerena.model.User;
import com.example.cerena.model.BloodBank.Donor;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.SMSService;
import com.example.cerena.service.UserService;
import com.example.cerena.service.BloodBank.DonorService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private SMSService smsService;


    @PostMapping("/register")
    public ResponseEntity<Donor> registerDonor(@RequestBody Donor donor, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
            if (authorization == null)
                return ResponseEntity.status(403).build();

            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);

            if (user == null || !jwtService.isTokenValid(token, user))
                return ResponseEntity.status(403).build();

        donor.setVerified(false);
        donor.setAddedBy(email);
        Donor newDonor =  donorService.saveDonor(donor);
        smsService.sendVerificationMessage(newDonor);
        
        return ResponseEntity.status(200).body(newDonor);
    }

    @GetMapping("/added")
    public ResponseEntity<Page<Donor>> getDonorsAddedBy(@RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "50") int size, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization == null)
            return ResponseEntity.status(403).build();

        String token = authorization.substring(7);
        String email = jwtService.extractEmail(token);
        User user = userService.getUserByEmail(email);

        if (user == null || !jwtService.isTokenValid(token, user))
            return ResponseEntity.status(403).build(); 
        Pageable pageable = PageRequest.of(page, size);
        Page<Donor> donors = donorService.getDonorsAddedBy(user.getEmail(), pageable);
        return ResponseEntity.status(200).body(donors);
    }
   
    // @GetMapping("/search")
    // public List<Donor> searchDonors(@RequestParam String bloodGroup, 
    //                                 @RequestParam(required = false) String city,
    //                                 @RequestParam(required = false) String division,
    //                                 @RequestParam(required = false) String district) {
    //     return donorService.searchDonors(bloodGroup, city, division, district);
    // }

    // @GetMapping("/searchbylocation")
    // public List<Donor> searchDonorsByLocation(@RequestParam String city, 
    //                                           @RequestParam String district,
    //                                           @RequestParam String division) {
    //     return donorService.searchDonorsByLocation(city, district, division);
    // }

    // @GetMapping("/searchbycity")
    // public List<Donor> searchDonorsByCity(@RequestParam String city) {
    //     return donorService.searchbyCity(city);
    // }

    // @GetMapping("/searchbycity/donordetails")
    // public List<Donor> Donordetails(@RequestParam String city) {
    //     return donorService.searchbyCity(city);
    // }
    
    @GetMapping("/search")
    public Page<Donor> findDonorNear(@RequestParam double lng, @RequestParam double lat, @RequestParam double maxDistance, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return donorService.getDonorNear(lng, lat, maxDistance, pageable);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }        
    }

    @GetMapping("/searchByBloodGroup")
    public Page<Donor> findDonorOfBloodGroupNear(@RequestParam String bloodGroup, @RequestParam double lng, @RequestParam double lat, @RequestParam double maxDistance, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            System.out.println(bloodGroup + " " + lng + " " + lat + " " + maxDistance);
            Pageable pageable = PageRequest.of(page, size);
            return donorService.getDonorOfBloodGroupNear(bloodGroup, lng, lat, maxDistance, pageable);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }        
    }

    @GetMapping("/countByBloodGroup")
    public Map<String, Long> countDonorsByBloodGroup() {
        return donorService.countDonorsByBloodGroup();
    }
}
