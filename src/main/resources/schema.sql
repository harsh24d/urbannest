-- Schema for Urban Nest Database
-- Creates the property table

DROP TABLE IF EXISTS property;

CREATE TABLE property (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    description VARCHAR(1000),
    image_url VARCHAR(500)
);
