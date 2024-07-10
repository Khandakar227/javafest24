package com.example.cerena.controller.SignController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.cerena.model.Signlaguage.SignLanguageEntry;
import com.example.cerena.service.SignService.SignLanguageService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/signs")
public class SignLanguageController {

   @Autowired
    private SignLanguageService signLanguageService;

    @GetMapping
    public ResponseEntity<List<SignLanguageEntry>> getAllSigns() {
        List<SignLanguageEntry> entries = signLanguageService.getAllEntries();
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<SignLanguageEntry> getSignById(@PathVariable String id) {
        SignLanguageEntry entry = signLanguageService.getEntryById(id);
        return new ResponseEntity<>(entry, HttpStatus.OK);
    }

    @GetMapping("/word/{word}")
    public ResponseEntity<List<SignLanguageEntry>> getSignByWord(@PathVariable String word) {
        List<SignLanguageEntry> entries = signLanguageService.getEntryByWord(word);
        return new ResponseEntity<>(entries, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SignLanguageEntry> createSign(@RequestBody SignLanguageEntry entry) {
        SignLanguageEntry savedEntry = signLanguageService.saveEntry(entry);
        return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
    }

}