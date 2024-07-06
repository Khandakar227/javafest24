package com.example.cerena.controller.BloodBank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.cerena.model.BloodBank.Donor;
import com.example.cerena.service.BloodBank.DonorService;

// import javax.validation.Valid;
import java.util.List;
@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/api/v1/donors")
public class DonorController {

    @Autowired
    private DonorService donorService;
    @GetMapping
    public String retuString()
    {
        return "Hello Donor";
    }

    @PostMapping("/register")
    public Donor registerDonor(@RequestBody Donor donor) {
        return donorService.saveDonor(donor);
    }
   

    @GetMapping("/search")
    public List<Donor> searchDonors(@RequestParam String bloodGroup, 
                                    @RequestParam(required = false) String city,
                                    @RequestParam(required = false) String division,
                                    @RequestParam(required = false) String district) {
        return donorService.searchDonors(bloodGroup, city, division, district);
    }
}
