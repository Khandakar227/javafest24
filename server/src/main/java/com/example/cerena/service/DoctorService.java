package com.example.cerena.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Doctor;
import com.example.cerena.repository.DoctorRepository;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> findAllDoctors() {
        return doctorRepository.findAll();
    }
    public Page<Doctor> findAllDoctors(Pageable pageable) {
        return doctorRepository.findAll(pageable);
    }
    public Page<Doctor> findAllDoctors(String district, String speciality, String query, Pageable pageable) {
        if(query == null || query.isEmpty()) return doctorRepository.findAllBy(district, speciality, pageable);
        return doctorRepository.findAllBy(district, speciality, query, pageable);
    }
    public Page<Doctor> searchDoctors(String searchText, Pageable pageable) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
        return doctorRepository.findAllBy(criteria, pageable);
    }

    public Doctor getDoctorById(String id) {
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
    public long countDoctors() {
        return doctorRepository.count();
    }
    
    public void deleteEntry(String id) {
        doctorRepository.deleteById(id);
    }

    public Doctor updateById(Doctor doctor) {
        return doctorRepository.save(doctor);
    }
}
