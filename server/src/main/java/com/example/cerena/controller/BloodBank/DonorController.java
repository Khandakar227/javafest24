package com.example.cerena.controller.BloodBank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.example.cerena.model.BloodBank.Donor;
import com.example.cerena.service.BloodBank.DonorService;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;
    

    @PostMapping("/register")
    public Donor registerDonor(@RequestBody Donor donor) {
        donor.setVerified(false);
        return donorService.saveDonor(donor);
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
    public Page<Donor> findDonorNear(@RequestParam double lat, @RequestParam double lng, @RequestParam(defaultValue="800") String maxDistance, @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return donorService.getDonorNear(lat, lng, size, pageable);
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
