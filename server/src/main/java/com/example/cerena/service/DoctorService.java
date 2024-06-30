package com.example.cerena.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Doctor;
import com.example.cerena.model.Medicinemodel.Medicine;
import com.example.cerena.repository.DoctorRepository;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

      public List<Doctor> allmed() {
       
        return doctorRepository.findAll();
    }

    public Page<Doctor> searchDoctors(String searchText, Pageable pageable) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
        return doctorRepository.findAllBy(criteria, pageable);
    }
    public Doctor getDoctorById(ObjectId id) {
        return doctorRepository.findById(id).orElse(null);
    }
    public Page<Doctor> getDoctorsBySpeciality(String speciality, Pageable pageable) {
        return doctorRepository.findBySpeciality(speciality, pageable);
    }
    public Page<Doctor> getDoctorsByDistrict(String district, Pageable pageable) {
        return doctorRepository.findByDistrict(district, pageable);
    }
    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
    public List<Doctor> addAllDoctors(List<Doctor> doctors) {
        return doctorRepository.saveAll(doctors);
    }
}
