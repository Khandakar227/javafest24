package com.example.cerena.model.Medicinemodel;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
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
    private ObjectId id;

    @Field(name = "generic id")
    private int genericId;

    @Field(name = "generic name")
    private String genericName;

    private String slug;

    @Field(name = "monograph link")
    private String monographLink;

    @Field(name = "drug class")
    private String drugClass;

    private String indication;

    @Field(name = "indication description")
    private String indicationDescription;

    @Field(name = "therapeutic class description")
    private String therapeuticClassDescription;

    @Field(name = "pharmacology description")
    private String pharmacologyDescription;

    @Field(name = "dosage description")
    private String dosageDescription;

    @Field(name = "administration description")
    private String administrationDescription;

    @Field(name = "interaction description")
    private String interactionDescription;

    @Field(name = "contraindications description")
    private String contraindicationsDescription;

    @Field(name = "side effects description")
    private String sideEffectsDescription;

    @Field(name = "pregnancy and lactation description")
    private String pregnancyAndLactationDescription;

    @Field(name = "precautions description")
    private String precautionsDescription;

    @Field(name = "pediatric usage description")
    private String pediatricUsageDescription;

    @Field(name = "overdose effects description")
    private String overdoseEffectsDescription;

    @Field(name = "storage conditions description")
    private String storageConditionsDescription;
    
}
