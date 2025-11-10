package com.urbannest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * Property Entity Class
 * Represents a real estate property in the database
 */
@Entity
@Table(name = "property")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Property {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String location;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    @Column(length = 1000)
    private String description;
    
    @Column(name = "image_url")
    private String imageUrl;
}
