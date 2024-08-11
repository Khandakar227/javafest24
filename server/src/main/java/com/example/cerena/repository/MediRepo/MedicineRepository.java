package com.example.cerena.repository.MediRepo;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.Medicine.Medicine;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {
    Medicine findByBrandName(String brandName);
    
    @Query("{ 'type': { $regex: ?0, $options: 'i' } }")
    Page<Medicine> findByType(String type, Pageable pageable);
     @Field(name = "manufacturer")
    @Query("{ 'manufacturer': { $regex: ?0, $options: 'i' } }")
    Page<Medicine> findByManufacturer(String manufacturer, Pageable pageable);
    Page<Medicine> findAllBy(TextCriteria criteria, Pageable pageable);
    @Query("{ '$or': [ {'brandName': { $regex: '?0', $options: 'i' }}, {'strength': { $regex: '?0', $options: 'i' }}, {dosageForm: { $regex: '?0', $options: 'i' }}, {manufacturer:{ $regex: '?0', $options: 'i' }} ] }")
    Page<Medicine> search(String text, Pageable pageable);
    Optional<Medicine> findMedicineBySlug(String slug);
    Page<Medicine> findByGenericContainingIgnoreCase(String genericName, Pageable pageable);
    
}

