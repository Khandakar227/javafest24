package com.example.cerena;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MainApplication {

	public static void main(String[] args) {
		// TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(MainApplication.class, args);
	}

}
