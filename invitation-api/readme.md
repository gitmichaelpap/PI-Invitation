# Invitation API #

### Requires ###
* Java 11
* Docker - https://docs.docker.com/install/
* Docker compose - https://docs.docker.com/compose/install/
* Maven - https://maven.apache.org/download.cgi


## Execute maven, generating jar file
```sh
mvn clean install
```


## Execute DockerFile, creating api image
```sh
docker build -t invitation/invitation-api:0.0.1 .
```

## Access the folder docker
```sh
cd docker/
```

## Execute docker-compose to run an API and a database 
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



## Access the folder docker/api
```sh
cd docker/api
```

## Execute docker-compose to run an API
```sh
docker-compose up -d
```
This command its gonna start:
- Invitation API (running on pont localhost:8080)

After the application started access the url:
```sh
http://localhost:8080/swagger-ui.html
```
You should see the swegger documentation



## Access the folder docker/database
```sh
cd docker/database
```

## Execute docker-compose to run a database
```sh
docker-compose up -d
```
This command its gonna start:
- Postrgres server (running on pont localhost:5432)


Swagger api heroku:
```sh
https://api-invitation-pi.herokuapp.com/swagger-ui/index.html#/
```
You should see the swegger documentation
