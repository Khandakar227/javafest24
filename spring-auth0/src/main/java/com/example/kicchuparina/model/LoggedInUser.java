package com.example.kicchuparina.model;

public class LoggedInUser {
    public String email;
    public String sub;
    public String sid;
    public boolean email_verified;

    public LoggedInUser(String email, String sub, String sid, boolean email_verified) {
        this.email = email;
        this.sub = sub;
        this.sid = sid;
        this.email_verified = email_verified;
    }
}