package com.example.cerena.model.Medicinemodel;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "medicine")

// @Document("movies")//
@Data
@AllArgsConstructor
@NoArgsConstructor
// @Getter @Setter
public class Medicine {
    @Id
    private ObjectId id;

    private String type;
    @Field(name = "brand name")
    private String Name;
    private String slug;
    @Field(name = "strength")
    private String MG;
    @Field(name = "dosage form")
    private String dosageForm;
    @Field(name = "generic")
    private String GenericName;

    @Field(name = "manufacturer")
    private String CompanyName;
    @Field(name = "package container")
    private String Price;
    // @Field(name = "Package Size")
    // private String Size;

    public Medicine(String type, String name,String slug, String mg,String dosage, String genericName, String companyName, String price
            ) {
        super();
        this.slug=slug;
        this.dosageForm=dosage;
        this.type = type;
        this.Name = name;
        this.MG = mg;
        this.GenericName = genericName;
        this.CompanyName = companyName;
        this.Price = price;
       
    }
}

