package com.example.cerena.model.Signlaguage;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Document("handspeak")
@Data
@RestController
@AllArgsConstructor
@NoArgsConstructor
public class SignLanguageEntry {
    private List<String> videos;
    private List<String> images;
    private String word;

    // Getters and Setters
    public List<String> getVideos() {
        return videos;
    }

    public void setVideos(List<String> videos) {
        this.videos = videos;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }
}