package com.example.cerena.service.BloodBank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.cerena.model.BloodBank.Donor;
import com.example.cerena.repository.BloodBank.DonorRepository;
import com.mongodb.client.model.geojson.Point;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    public Donor saveDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    // public List<Donor> searchDonors(String bloodGroup, String city, String division, String district) {
    //     if (city == null|| division == null ||district == null) {
    //         return donorRepository.findByBloodGroup(bloodGroup);
    //     }
    //     return donorRepository.findByBloodGroupAndCityAndDivisionAndDistrict(bloodGroup, city, division, district);
    // }
    

    // public List<Donor> searchDonorsByLocation(String city, String district, String division) {
    //     return donorRepository.findByCityOrDistrictOrDivision(city, district, division);
    // }
    // public List<Donor> searchbyCity(String city) {
    //     return donorRepository.findByCity(city);
    // }

    public Page<Donor> getDonorNear(double lat, double lng, double maxDistance, Pageable pageable) {
        return donorRepository.findNear(lat, lng, maxDistance, pageable);
    }
     public Map<String, Long> countDonorsByBloodGroup() {
        List<Donor> donors = donorRepository.findAll();
        Map<String, Long> bloodGroupCount = new HashMap<>();
        for (Donor donor : donors) {
            String bloodGroup = donor.getBloodGroup();
            bloodGroupCount.put(bloodGroup, bloodGroupCount.getOrDefault(bloodGroup, 0L) + 1);
        }
        return bloodGroupCount;
    }
    
}
