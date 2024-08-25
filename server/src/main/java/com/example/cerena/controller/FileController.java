package com.example.cerena.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.cerena.model.FilePathResponse;
import com.example.cerena.service.FileStorageService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @Autowired
    FileStorageService storageService;

    @PostMapping("/doctor/upload")
    public ResponseEntity<FilePathResponse> uploadFile(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        String message = "";
        try {
            storageService.init();
            String filePath = storageService.save(file);
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new FilePathResponse(message, false, filePath));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new FilePathResponse(message, false, ""));
        }
    }

    @PostMapping("/videos/upload")
    public ResponseEntity<Map<String, Object>> uploadVideo(@RequestParam("files") List<MultipartFile> files, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            storageService.init();
            List<String> videoUrls = storageService.saves(files);
            response.put("message", "Uploaded the file successfully: " + videoUrls.size());
            response.put("videoUrls", videoUrls);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
            e.printStackTrace();
            response.put("message", "Could not upload the videos! "+ e.getLocalizedMessage());
            response.put("error", true);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(response);
        }
    }

    // private String getServerUrl(HttpServletRequest request) {
    //     String scheme = request.getScheme(); // http or https
    //     String serverName = request.getServerName(); // localhost or domain name
    //     int serverPort = request.getServerPort(); // 80, 443, etc.
    //     String contextPath = request.getContextPath(); // application context path

    //     // Construct the server URL
    //     StringBuilder serverUrl = new StringBuilder();
    //     serverUrl.append(scheme).append("://").append(serverName);

    //     // Only append the port if it's not a standard port
    //     if ((scheme.equals("http") && serverPort != 80) || (scheme.equals("https") && serverPort != 443)) {
    //         serverUrl.append(":").append(serverPort);
    //     }

    //     serverUrl.append(contextPath);
    //     return serverUrl.toString();
    // }

}
