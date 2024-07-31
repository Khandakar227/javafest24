package com.example.cerena.service.BloodBank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.example.cerena.model.BloodBank.Donor;
import com.example.cerena.repository.BloodBank.DonorRepository;

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

    public Donor getDonorById(String id) {
        return donorRepository.findById(id).orElse(null);
    }

    public Page<Donor> getDonorNear(double lng, double lat, double maxDistance, Pageable pageable) {
        return donorRepository.findNear(lng, lat, maxDistance, pageable);
    }
    public Page<Donor> getDonorOfBloodGroupNear(String bloodGroup, double lng, double lat, double maxDistance, Pageable pageable) {
        return donorRepository.findNearByBLoodGroup(bloodGroup, lng, lat, maxDistance, pageable);
    }

    public Page<Donor> getDonorsAddedBy(String addedBy, Pageable pageable) {
        return donorRepository.findByAddedBy(addedBy, pageable);
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
    
    public long count() {
        return donorRepository.count();
    }
}
