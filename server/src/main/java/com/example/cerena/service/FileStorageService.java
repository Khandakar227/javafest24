package com.example.cerena.service;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

@Service
public class FileStorageService {
    private Path root;
    private Path staticPath;
    public void init() {
        try {
            staticPath = Paths.get((new ClassPathResource("static/")).getURI());
            root = staticPath.resolve("uploads");

            if (!root.toFile().exists()) {
                root.toFile().mkdir();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }
    }

    public String save(MultipartFile file) {
        try {
            // Get the original file extension
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            }
            String randomUUID = UUID.randomUUID().toString();
            
            // Construct the new filename with the UUID
            String newFilename = randomUUID + extension;
            Path filePath = this.root.resolve(newFilename);

            Files.write(filePath, file.getBytes());
            
            return staticPath.relativize(filePath).toString().replace("\\", "/");
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
}
