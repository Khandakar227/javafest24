package com.example.cerena.service.MediService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Medicinemodel.Medicine;
import com.example.cerena.repository.MediRepo.MedicineRepository;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;
 

    public List<Medicine> allmed() {
       
        return medicineRepository.findAll();
    }
    
    public Page<Medicine> searchMedicines(String searchText, Pageable pageable) {
        TextCriteria criteria = TextCriteria.forDefaultLanguage().matching(searchText);
        return medicineRepository.findAllBy(criteria, pageable);
    }

    public Optional<Medicine> getMedicineById(String id) {
        return Optional.of(medicineRepository.findById(id).orElse(null));
    }
 

    public Page<Medicine> getMedicinesByType(String type, Pageable pageable) {
        return medicineRepository.findByType(type, pageable);
    }

    public Page<Medicine> getMedicinesByCompany(String manufacturer, Pageable pageable) {
        return medicineRepository.findByCompanyName(manufacturer, pageable);
    }

    public Medicine createMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    public List<Medicine> addAllMedicines(List<Medicine> medicines) {
        return medicineRepository.saveAll(medicines);
    }
}
