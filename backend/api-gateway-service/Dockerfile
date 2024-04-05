# jar 파일 빌드
FROM eclipse-temurin:17 as builder

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootjar

# Start with a base image containing Java runtime
FROM eclipse-temurin:17 as runtime

# Add a volume to /tmp
VOLUME /tmp
# Make port 8000 available to the world outside this container
EXPOSE 8000

COPY --from=builder build/libs/*.jar app.jar

# Run the jar file
ENTRYPOINT ["java","-jar","-Dspring.profiles.active=prod", "-Duser.timezone=Asia/Seoul","/app.jar"]