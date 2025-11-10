# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Set the working directory for the build stage
WORKDIR /app

# Copy Maven build descriptor and pre-fetch dependencies to leverage Docker layer caching
COPY pom.xml ./
RUN mvn -B dependency:go-offline

# Copy project sources and build the application
COPY src ./src
RUN mvn -B clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:17-jre-jammy

# Set the working directory for the final image
WORKDIR /app

# Copy the runnable JAR from the build stage
COPY --from=build /app/target/urban-nest-1.0.0.jar app.jar

# Expose the Spring Boot default port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
