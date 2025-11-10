package com.urbannest.service;

import com.urbannest.model.Property;
import com.urbannest.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Property Service Class
 * Contains business logic for property operations
 */
@Service
public class PropertyService {
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    /**
     * Get all properties from database
     * @return List of all properties
     */
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
    
    /**
     * Get a specific property by ID
     * @param id - property ID
     * @return Optional containing property if found
     */
    public Optional<Property> getPropertyById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return propertyRepository.findById(id);
    }
    
    /**
     * Search properties by location
     * @param location - location to search for
     * @return List of properties matching the location
     */
    public List<Property> searchProperties(String location) {
        if (location == null || location.trim().isEmpty()) {
            return getAllProperties();
        }
        return propertyRepository.findByLocationContainingIgnoreCase(location);
    }
}
