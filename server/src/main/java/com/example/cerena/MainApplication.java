package com.example.cerena;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;

@SpringBootApplication
@RestController
public class MainApplication {

	public static void main(String[] args) {
		// TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(MainApplication.class, args);
	}
	@GetMapping("/")
	public String index() {
		return "Hello World";
	}

}
