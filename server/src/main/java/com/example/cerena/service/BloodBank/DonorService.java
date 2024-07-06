package com.example.cerena.service.BloodBank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cerena.model.BloodBank.Donor;
import com.example.cerena.repository.BloodBank.DonorRepository;

import java.util.List;

@Service
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    public Donor saveDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public List<Donor> searchDonors(String bloodGroup, String city, String division, String district) {
        if (city == null|| division == null ||district == null) {
            return donorRepository.findByBloodGroup(bloodGroup);
        }
        return donorRepository.findByBloodGroupAndCityAndDivisionAndDistrict(bloodGroup, city, division, district);
    }
}
