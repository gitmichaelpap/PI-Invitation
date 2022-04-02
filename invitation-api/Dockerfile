FROM adoptopenjdk/openjdk11:alpine
VOLUME /tmp
COPY target/invitation-api-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]