package com.example.cerena.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.cerena.model.BloodBank.Donor;

import java.util.HashMap;
import java.util.Map;
import java.net.URI;

import java.util.regex.Pattern;
import java.util.regex.Matcher;


@Service
public class SMSService {
    @Autowired
    JwtService jwtService;
    @Autowired
    private RestTemplate restTemplate;

    @Value("${sms.api}")
    private String apiKey;
    @Value("${sms.smsSenderId}")
    private String SmsSenderId;

    public String sendVerificationMessage(Donor donor) {
        String baseUrl = "http://bulksmsbd.net/api/smsapi";
        String token = getToken(donor);
        // System.out.println(token);
        String message = getMessage(token);
        // System.out.println(message);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(baseUrl);
        
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("api_key", apiKey);
        queryParams.put("type", "text");
        queryParams.put("number", formatPhoneNumber(donor.getMobileNo()));
        queryParams.put("senderid", SmsSenderId);
        queryParams.put("message", message);

        queryParams.forEach(builder::queryParam);
        URI uri = builder.build().toUri();

        return restTemplate.getForObject(uri, String.class);
    }

    private String getToken(Donor donor) {
        return jwtService.generatePhoneVerificationToken(donor.getId(), donor.getMobileNo());
    }

    private String getMessage(String token) {
        return
"""
Dear Recipient,
Your number has been added as a blood donor for our site. People can contact you when they need urgent blood. To verify your phone number, please click the link below:
"""
+ "http://localhost:8080/api/v1/donors/verify?token=" + token +
"""
\n
If you have no knowledge of this, you can ignore this message.

Thank you,
Cerena Team
""";
    }
    public String formatPhoneNumber(String phoneNumber) {
        phoneNumber = phoneNumber.replaceAll("[^0-9]", "");
        // regex pattern to check if the phone number starts with "88"
        Pattern pattern = Pattern.compile("^88");
        Matcher matcher = pattern.matcher(phoneNumber);

        // If the phone number does not start with "88", prepend "88" to the phone number
        if (!matcher.find()) {
            phoneNumber = "88" + phoneNumber;
        }

        return phoneNumber;
    }
}
