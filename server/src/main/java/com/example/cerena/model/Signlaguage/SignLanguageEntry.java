package com.example.cerena.model.Signlaguage;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("handspeak")
@Data
@NoArgsConstructor
@Getter
@Setter
public class SignLanguageEntry {
    @Id
    private String  id;
    private List<String> videos;
    private List<String> images;
    private String word;

    public SignLanguageEntry(List<String> videos, List<String> images, String word) {
        super();
        this.videos = videos;
        this.images = images;
        this.word = word;
    }
}