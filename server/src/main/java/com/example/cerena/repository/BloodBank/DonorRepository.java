package com.example.cerena.repository.BloodBank;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.BloodBank.Donor;

import java.util.List;
@Repository
public interface DonorRepository extends MongoRepository<Donor, String> {
    List<Donor> findByBloodGroup(String bloodGroup);

    @Query("{bloodGroup: ?0, 'addresses.location': { $near: { $geometry: { type: 'Point', coordinates: [?1, ?2] }, $maxDistance: ?3 } }}")
    Page<Donor> findNearByBLoodGroup(String bloodGroup, double lng, double lat, double maxDistance, Pageable pageable);

    @Query("{'addresses.location': { $near: { $geometry: { type: 'Point', coordinates: [?0, ?1] }, $maxDistance: ?2 } }}")
    Page<Donor> findNear(double lng, double lat, double maxDistance, Pageable pageable);

    @Query("{addedBy: ?0}")
    Page<Donor> findByAddedBy(String addedBy, Pageable pageable);
}
