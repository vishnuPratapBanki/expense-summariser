# Use a JDK base image
FROM openjdk:17-jdk-alpine

# Copy the built jar file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port your backend runs on (usually 8080)
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java","-jar","/app.jar"]
