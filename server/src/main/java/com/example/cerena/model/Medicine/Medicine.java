package com.example.cerena.model.Medicine;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "medicine")

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Medicine {
    @Id
    private String id;

    private String type;

    @Field(name = "brandName")
    private String brandName;
    private String slug;
    
    @Field(name = "strength")
    private String strength;

    @Field(name = "dosageForm")
    private String dosageForm;

    @Field(name = "generic")
    private String generic;

    @Field(name = "manufacturer")
    private String manufacturer;

    @Field(name = "price")
    private String price;


    public Medicine(String type, String brandName, String slug, String strength, String generic,
            String manufacturer, String price, String dosageForm) {
        super();
        this.slug = slug;
        this.type = type;
        this.brandName = brandName;
        this.strength = strength;
        this.generic = generic;
        this.manufacturer = manufacturer;
        this.price = price;
        this.dosageForm = dosageForm;
    }
}
