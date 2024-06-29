package com.example.cerena.model;

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

@Document(collection="mediciness")
// @Document("movies")//
@Data
@AllArgsConstructor
@NoArgsConstructor
// @Getter @Setter
public class Medicine {
    @Id
    private ObjectId id;

    private String Type;
    private String Name;
    private String MG;
    @Field(name = "Generic Name")
    private String GenericName;

    @Field(name = "Company Name")
    private String CompanyName;

    private String Price;
    private String Link;

    public Medicine(String type, String name, String mg, String genericName, String companyName, String price,
            String link) {
        super();
        this.Type =type;
        this.Name = name;
        this.MG = mg;
        this.GenericName = genericName;
        this.CompanyName = companyName;
        this.Price = price;
        this.Link = link;
    }
}
