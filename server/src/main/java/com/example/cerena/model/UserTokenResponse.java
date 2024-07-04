package com.example.cerena.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserTokenResponse extends JwtTokenResponse {
    private User user;
    public UserTokenResponse(String message, boolean error, String token, User user) {
        super(message, error, token);
        this.user = user;
    }
    
}
