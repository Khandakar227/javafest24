package com.example.mongodemo.model;


// Importing required classes
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

// Annotations
@Data
@Getter @Setter
@AllArgsConstructor
public class EmailDetails {

	// Class data members
	private String recipient;
	private String msgBody;
	private String subject;
	private String attachment;
}
