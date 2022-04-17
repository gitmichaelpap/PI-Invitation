# Invitation API #

### Requires ###
* Java 11
* Docker - https://docs.docker.com/install/
* Docker compose - https://docs.docker.com/compose/install/
* Maven - https://maven.apache.org/download.cgi


## Execute maven, generating jar file
```sh
mvn clean install -DskipTests
```


## Execute DockerFile, creating api image
```sh
docker build -t invitation/invitation-api:0.0.1 .
```

## Access the folder docker
```sh
cd docker/
```

## Execute docker-compose
```sh
docker-compose up -d
```
This command its gonna start:
- Postrgres server (running on pont localhost:5432)
- Invitation API (running on pont localhost:8080)

After the application started access the url:
```sh
http://localhost:8080/swagger-ui.html
```
You should see the swegger documentation
