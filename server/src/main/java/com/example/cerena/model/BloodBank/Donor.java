package com.example.cerena.model.BloodBank;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
// import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "donors")
@Data
@Getter
@Setter
@AllArgsConstructor
public class Donor {
    @Id
    private String id;
    private String fullName;
    private String bloodGroup;
    private String gender;
    private int age;
    private String mobileNo;
    private boolean isVerified;
    private List<Address> addresses;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Address {
        private String name;
        @GeoSpatialIndexed
        private double[] location;
    }
}
