FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY . .

# 1) Build & install java-common into the local Maven repo
WORKDIR /app/packages/java-common
RUN mvn clean install -DskipTests

# 2) Build this backend, which now can resolve java-common from local repo
WORKDIR /app/apps/web_games/backend
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /app/apps/web_games/backend/target/web-games-backend-1.0.0.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
