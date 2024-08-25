package com.example.cerena.service.SignService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Signlaguage.SignLanguageEntry;
import com.example.cerena.model.Signlaguage.SignOnlyWord;
import com.example.cerena.repository.Signrepository.SignLanguageRepository;

import java.util.List;

@Service
public class SignLanguageService {

    @Autowired
    private SignLanguageRepository signLanguageRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Page<SignLanguageEntry> getAllEntries(Pageable pageable) {
        return signLanguageRepository.findAll(pageable);
    }
    public Page<SignOnlyWord> getAllWords(Pageable pageable) {
        return signLanguageRepository.findAllWords(pageable);
    }
    public SignLanguageEntry getEntryById(String id) {
        return signLanguageRepository.findById(id).orElse(null);
    }

    public SignLanguageEntry saveEntry(SignLanguageEntry entry) {
        return signLanguageRepository.save(entry);
    }
   
    public void saveAllEntries(List<SignLanguageEntry> entries) {
        signLanguageRepository.saveAll(entries);
    }

    public List<SignLanguageEntry> getEntryByWord(String word) {
        return signLanguageRepository.findByWord(word);
    }

    public Page<SignLanguageEntry> getEntriesByPrefix(String prefix, Pageable pageable) {
        return signLanguageRepository.findByTextStartingWith(prefix, pageable);
    }
    
    public SignLanguageEntry updateEntryByWOrd(String word, String newWord) {
        Query query = new Query();
        query.addCriteria(Criteria.where("word").is(word));
        Update update = new Update();
        update.set("word", newWord);
        return mongoTemplate.findAndModify(query, update, SignLanguageEntry.class);
    }
    
    public void deleteEntry(String id) {
        signLanguageRepository.deleteById(id);
    }

    public List<SignLanguageEntry> getRandomSample() {
        return signLanguageRepository.findRandomSample();
    }
    
    public long count() {
        return signLanguageRepository.count();
    }
}