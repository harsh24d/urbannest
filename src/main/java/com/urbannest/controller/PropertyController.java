package com.urbannest.controller;

import com.urbannest.model.Property;
import com.urbannest.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Property Controller
 * REST API endpoints for property operations
 */
@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*") // Allow cross-origin requests from frontend
public class PropertyController {
    
    @Autowired
    private PropertyService propertyService;
    
    /**
     * GET /api/properties - Get all properties
     * @return List of all properties
     */
    @GetMapping
    public ResponseEntity<List<Property>> getAllProperties() {
        List<Property> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }
    
    /**
     * GET /api/properties/{id} - Get property by ID
     * @param id - property ID
     * @return Property details or 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        return property.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * GET /api/properties/search?location=<city> - Search properties by location
     * @param location - location query parameter
     * @return List of matching properties
     */
    @GetMapping("/search")
    public ResponseEntity<List<Property>> searchProperties(
            @RequestParam(required = false) String location) {
        List<Property> properties = propertyService.searchProperties(location);
        return ResponseEntity.ok(properties);
    }
}
