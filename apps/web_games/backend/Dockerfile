# apps/web_games/backend/Dockerfile

# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy entire monorepo so java-common is available
COPY . .

# Go to this app's backend
WORKDIR /app/apps/web_games/backend

# Build jar (and any dependent modules) without tests
RUN mvn -am clean package -DskipTests

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the fat jar from the build stage
# (adjust name if your final jar changes)
COPY --from=build /app/apps/web_games/backend/target/web-games-backend-1.0.0.jar app.jar

# Port your Spring Boot app listens on (if using server.port=8080)
EXPOSE 8080

# Java will read env vars that Docker injects (via env_file in docker-compose)
CMD ["java", "-jar", "app.jar"]
