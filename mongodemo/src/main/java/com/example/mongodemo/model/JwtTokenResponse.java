package com.example.mongodemo.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class JwtTokenResponse extends Response {
    private String token;

    public JwtTokenResponse(String message, boolean error, String token) {
        super(message, error);
        this.token = token;
    }
}
