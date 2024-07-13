package com.example.cerena.repository.BloodBank;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.BloodBank.Donor;

import java.util.List;
@Repository
public interface DonorRepository extends MongoRepository<Donor, String> {
    
    // System.out.println("repos calling");
    List<Donor> findByBloodGroup(String bloodGroup);
    List<Donor> findByCity(String city);
   
    
     List<Donor> findByCityOrDistrictOrDivision(String city, String district, String division);
    // List<Donor> findByLocationNear(double lat, double lng);
    List<Donor> findByBloodGroupAndCityAndDivisionAndDistrict(String bloodGroup, String city, String division, String district);
}
