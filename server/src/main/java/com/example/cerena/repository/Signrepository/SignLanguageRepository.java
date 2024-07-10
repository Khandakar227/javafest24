package com.example.cerena.repository.Signrepository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.cerena.model.Signlaguage.SignLanguageEntry;

@Repository
public interface SignLanguageRepository extends MongoRepository<SignLanguageEntry, String> {
    //public List<SignLanguageEntry> findByLanguage(String language);
    //public List<SignLanguageEntry> findByLanguageAndSign(String language, String sign);
    public List<SignLanguageEntry> findByWord(String word);
}
