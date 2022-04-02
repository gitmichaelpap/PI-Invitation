package com.puc.invitationapi.controller.doc;

import com.puc.invitationapi.dto.LoginDTO;
import com.puc.invitationapi.dto.Token;
import com.puc.invitationapi.handlers.ApplicationExceptionHandler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public interface AuthControllerDoc {

    @Operation(summary = "Log in to the system by email and password")
    @ApiResponse(responseCode = "200", description = "Access token and Refresh token",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = Token.class, description = "Tokens")))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "login")
    ResponseEntity<Token> login(LoginDTO loginDTO);

}
