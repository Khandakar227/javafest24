package com.example.cerena.service.SignService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cerena.model.Signlaguage.SignLanguageEntry;
import com.example.cerena.repository.Signrepository.SignLanguageRepository;

import java.util.List;

@Service
public class SignLanguageService {

    @Autowired
    private SignLanguageRepository signLanguageRepository;

    public List<SignLanguageEntry> getAllEntries() {
        return signLanguageRepository.findAll();
    }

    public SignLanguageEntry getEntryById(String id) {
        return signLanguageRepository.findById(id).orElse(null);
    }

    public SignLanguageEntry saveEntry(SignLanguageEntry entry) {
        return signLanguageRepository.save(entry);
    }
   
    public List<SignLanguageEntry> getEntryByWord(String word) {
        return signLanguageRepository.findByWord(word);
    }

    // public void deleteEntry(String id) {
    //     signLanguageRepository.deleteById(id);
    // }

}