package com.example.cerena.repository.Signrepository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.Signlaguage.SignLanguageEntry;
import com.example.cerena.model.Signlaguage.SignOnlyWord;

@Repository
public interface SignLanguageRepository extends MongoRepository<SignLanguageEntry, String> {
    public List<SignLanguageEntry> findByWord(String word);

    @Query(value="{ }", fields="{ 'images' : 0, 'videos' : 0, '_id': 0, '_class' : 0}")
    public Page<SignOnlyWord> findAllWords(Pageable pageable);

    @Query("{ 'word': { $regex: '^?0', $options: 'i' } }")
    public Page<SignLanguageEntry> findByTextStartingWith(String prefix, Pageable pageable);
    @Aggregation("{ '$sample': { size: 4 } }")
    public List<SignLanguageEntry> findRandomSample();
}
