package com.puc.invitationapi.controller;

import com.puc.invitationapi.controller.doc.AuthControllerDoc;
import com.puc.invitationapi.dto.LoginDTO;
import com.puc.invitationapi.dto.Token;
import com.puc.invitationapi.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class AuthController implements AuthControllerDoc {

    private static final String ENTITY_NAME_V1 = "/v1.0/login";

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value = ENTITY_NAME_V1, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<Token> login(@RequestBody LoginDTO loginDTO) throws Exception {
        return ResponseEntity.ok(authService.login(loginDTO));
    }


}
