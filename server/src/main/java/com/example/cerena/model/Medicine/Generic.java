package com.example.cerena.model.Medicine;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "generic")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Generic {
    @Id
    private String id;

    private int genericId;
    
    @TextIndexed private String name;

    private String slug;

    @Field(name = "monographLink")
    private String monographLink;

    @Field(name = "drugClass")
    private String drugClass;

    private String indication;

    @Field(name = "indicationDescription")
    private String indicationDescription;

    @Field(name = "therapeuticClassDescription")
    private String therapeuticClassDescription;

    @Field(name = "pharmacologyDescription")
    private String pharmacologyDescription;

    @Field(name = "dosageDescription")
    private String dosageDescription;

    @Field(name = "administrationDescription")
    private String administrationDescription;

    @Field(name = "interactionDescription")
    private String interactionDescription;

    @Field(name = "contraindicationsDescription")
    private String contraindicationsDescription;

    @Field(name = "sideEffectsDescription")
    private String sideEffectsDescription;

    @Field(name = "pregnancyAndLactationDescription")
    private String pregnancyAndLactationDescription;

    @Field(name = "precautionsDescription")
    private String precautionsDescription;

    @Field(name = "pediatricUsageDescription")
    private String pediatricUsageDescription;

    @Field(name = "overdoseEffectsDescription")
    private String overdoseEffectsDescription;

    @Field(name = "storageConditionsDescription")
    private String storageConditionsDescription;
    
}
