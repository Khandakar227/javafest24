package com.example.kicchuparina.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.kicchuparina.AuthConfig;
import com.example.kicchuparina.model.LoggedInUser;
import com.example.kicchuparina.service.ApiService;

@Controller
public class UserController {
    
    @Autowired
    private ApiService apiService;

    // @Autowired
    // private AuthConfig config;
    
    @GetMapping(value = "/api/user")
    @ResponseBody
    public ResponseEntity<LoggedInUser> getUser(HttpServletRequest request, HttpServletResponse response, final Authentication authentication) throws IOException {
        LoggedInUser user = apiService.getLoggedInUser(authentication);
        System.out.println(user);
        if (user != null)
            return ResponseEntity.ok(user);
        else
            response.sendRedirect("/api/auth/login");
        return null;
    }
    
}
