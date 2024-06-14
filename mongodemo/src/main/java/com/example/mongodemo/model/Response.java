package com.example.mongodemo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class Response {
    private String message;
    private boolean error;
}
