package com.example.cerena.service.Medicine;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Medicine.Medicine;
import com.example.cerena.repository.MediRepo.MedicineRepository;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;
 

    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }
    public Page<Medicine> getAllMedicines(Pageable pageable) {
        return medicineRepository.findAll(pageable);
    }
    public Page<Medicine> searchMedicines(String searchText, Pageable pageable) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
        return medicineRepository.findAllBy(criteria, pageable);
    }

    public Optional<Medicine> getMedicineById(String id) {
        return medicineRepository.findById(id);
    }

    public Page<Medicine> getMedicinesByType(String type, Pageable pageable) {
        return medicineRepository.findByType(type, pageable);
    }

    public Page<Medicine> getMedicinesByCompany(String manufacturer, Pageable pageable) {
        return medicineRepository.findByManufacturer(manufacturer, pageable);
    }

    public Optional<Medicine> getMedicineBySlug(String slug) {
        return medicineRepository.findMedicineBySlug(slug);
    }
    public Medicine createMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public List<Medicine> addAllMedicines(List<Medicine> medicines) {
        return medicineRepository.saveAll(medicines);
    }
    

    public Page<Medicine> search(String keyword, Pageable page) {
        return medicineRepository.search(keyword, page);
    }
    public long countMedicines() {
        return medicineRepository.count();
    }
    public Page<Medicine> searchBygeneric(String generic, Pageable pageable) {
        return medicineRepository.findByGenericContainingIgnoreCase(generic, pageable);
    }
    public void deleteById(String id) {
        medicineRepository.deleteById(id);
    }
}
