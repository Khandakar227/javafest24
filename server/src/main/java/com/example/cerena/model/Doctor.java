package com.example.cerena.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Document("doctors")
@Getter @Setter
public class Doctor {
    @Id
    private String id;
    private String photo;
    @TextIndexed private String name;
    private String degree;
    @TextIndexed private String speciality;
    @TextIndexed private String designation;
    @TextIndexed private String workplace;
    @TextIndexed private String chamber;
    private String about;
    @TextIndexed private String district;
    private String contact;

    public Doctor( String photo, String name, String degree, String speciality, String designation, String workplace, String chamber, String about, String district, String contact ) {
        super();
        this.photo = photo;
        this.name = name;
        this.degree = degree;
        this.speciality = speciality;
        this.designation = designation;
        this.workplace = workplace;
        this.chamber = chamber;
        this.about = about;
        this.district = district;
        this.contact = contact;
    }
}
