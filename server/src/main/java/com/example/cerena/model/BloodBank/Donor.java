package com.example.cerena.model.BloodBank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
// import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "donors")
@Data
@NoArgsConstructor@AllArgsConstructor
public class Donor {
    @Id
    private String id;
    
    // @NotBlank
    private String fullName;
    
    // @NotBlank
    private String bloodGroup;
    
    // @NotBlank
    private String gender;
    
    private int age;
    
    // @NotBlank
    private String mobileNo;
    
    // @NotBlank
    private String address;
    
    private String city;
    private String division;
    private String district;
 
}
