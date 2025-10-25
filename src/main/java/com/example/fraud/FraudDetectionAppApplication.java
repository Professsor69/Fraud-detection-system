package com.example.fraud;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FraudDetectionAppApplication {

    public static void main(String[] args) {
        // This is the starting point for the Java Virtual Machine (JVM).
        // It initializes the entire Spring context, sets up the web server (Tomcat),
        // scans for components (Controllers, Services, Repositories),
        // and starts the application.
        SpringApplication.run(FraudDetectionAppApplication.class, args);
    }
}