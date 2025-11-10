package com.urbannest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Application Class for Urban Nest
 * Real Estate Discovery Platform
 */
@SpringBootApplication
public class UrbanNestApplication {

    public static void main(String[] args) {
        SpringApplication.run(UrbanNestApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("Urban Nest Application Started!");
        System.out.println("Access the app at: http://localhost:8080");
        System.out.println("H2 Console at: http://localhost:8080/h2-console");
        System.out.println("========================================\n");
    }
}
