package com.urbannest.repository;

import com.urbannest.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Property Repository Interface
 * Handles database operations for Property entity
 */
@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    
    /**
     * Find properties by location (case-insensitive partial match)
     * @param location - the location to search for
     * @return List of matching properties
     */
    List<Property> findByLocationContainingIgnoreCase(String location);
}
