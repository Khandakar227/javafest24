package com.example.cerena.controller.SignController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cerena.model.Response;
import com.example.cerena.model.User;
import com.example.cerena.model.Signlaguage.SignLanguageEntry;
import com.example.cerena.model.Signlaguage.SignOnlyWord;
import com.example.cerena.service.JwtService;
import com.example.cerena.service.UserService;
import com.example.cerena.service.SignService.SignLanguageService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/signs")
public class SignLanguageController {
    @Autowired
    JwtService jwtService;

    @Autowired
    UserService userService;

    @Autowired
    private SignLanguageService signLanguageService;

    @GetMapping
    public ResponseEntity<Page<SignLanguageEntry>> getAllSigns(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return new ResponseEntity<>(signLanguageService.getAllEntries(pageable), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping("/prefix/{prefix}")
    public ResponseEntity<Page<SignLanguageEntry>> getSignByPrefix(
            @PathVariable String prefix,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return new ResponseEntity<>(signLanguageService.getEntriesByPrefix(prefix, pageable), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/words")
    public ResponseEntity<Page<SignOnlyWord>> getAllWords(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            return new ResponseEntity<>(signLanguageService.getAllWords(pageable), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/quiz")
    public List<SignLanguageEntry> getAQuizQuestion() {
        return signLanguageService.getRandomSample();
    }

    @PostMapping
    public ResponseEntity<SignLanguageEntry> addSign(@RequestBody SignLanguageEntry entry,
            HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if (authorization == null)
                return ResponseEntity.status(403).build();

            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);

            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            SignLanguageEntry savedEntry = signLanguageService.saveEntry(entry);
            return new ResponseEntity<>(savedEntry, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<Response> addSigns(@RequestBody List<SignLanguageEntry> entries, HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if (authorization == null)
                return ResponseEntity.status(403).build();

            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);

            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

            signLanguageService.saveAllEntries(entries);
            return ResponseEntity.ok(new Response("Signs added", false));
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/words/{word}")
    public ResponseEntity<SignLanguageEntry> updateSign(@PathVariable String word, @RequestBody SignLanguageEntry entry,
            HttpServletRequest request) {
        try {
            String authorization = request.getHeader("Authorization");
            if (authorization == null)
                return ResponseEntity.status(403).build();

            String token = authorization.substring(7);
            String email = jwtService.extractEmail(token);
            User user = userService.getUserByEmail(email);

            if (user == null || !jwtService.isTokenValid(token, user) || !user.getRole().equals("ADMIN"))
                return ResponseEntity.status(403).build();

           SignLanguageEntry updatedEntry = signLanguageService.updateEntryByWOrd(word, entry.getWord());
            return new ResponseEntity<>(updatedEntry, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count")
    public ResponseEntity<?> count() {
        Map<String, Long> response = new HashMap<>();
        response.put("count", signLanguageService.count());
        return ResponseEntity.ok(response);
    }
}