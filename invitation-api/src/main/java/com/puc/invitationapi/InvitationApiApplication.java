package com.puc.invitationapi;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
        info = @Info(
                title = "API Invitation",
                version = "1.0",
                description = "API para cadastro de noivos e seus convidados",
                license = @License(name = "Apache 2.0", url = "https://invitation.bar"),
                contact = @Contact(url = "https://github.com/gitmichaelpap/PI-Invitation", name = "Github")
        )
)
@SpringBootApplication
public class InvitationApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(InvitationApiApplication.class, args);
    }

}
