package com.example.mongodemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.mongodemo.model.EmailDetails;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public String sendSimpleMail(EmailDetails details) {
        try {

            // Creating a simple mail message
            SimpleMailMessage mailMessage = new SimpleMailMessage();

            // Setting up necessary details
            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setSubject(details.getSubject());
            mailMessage.setText(details.getMsgBody());

            // Sending the mail
            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        // Catch block to handle the exceptions
        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }
    public void sendVerificationEmail(String name, String email, String token) {
        String subject = "Email Verification";
        String msgBody = "Hello " + name + ",\n\n"
                + "Please click on the link below to verify your email address:\n\n"
                + "http://localhost:8080/api/v1/user/verify?token=" + token + "\n\n"
                + "Thank you!";
        EmailDetails details = new EmailDetails(email, msgBody, subject, null);
        sendSimpleMail(details);
    }
    public void sendPasswordResetEmail(String name, String email, String token) {
        String subject = "Password Reset";
        String msgBody = "Hello " + name + ",\n\n"
                + "Please click on the link below to reset your password:\n\n"
                + "http://localhost:8080/api/v1/user/reset-password/" + token + "\n\n"
                + "Thank you!";
        EmailDetails details = new EmailDetails(email, msgBody, subject, null);
        sendSimpleMail(details);
    }
}
