package com.example.cerena.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FilePathResponse extends Response {
    private String filePath;

    public FilePathResponse(String message, boolean error, String filePath) {
        super(message, error);
        this.filePath = filePath;
    }
}
