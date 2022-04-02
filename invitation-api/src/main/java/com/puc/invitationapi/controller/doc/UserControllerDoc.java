package com.puc.invitationapi.controller.doc;

import com.puc.invitationapi.dto.UserDTO;
import com.puc.invitationapi.handlers.ApplicationExceptionHandler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

public interface UserControllerDoc {

    @Operation(summary = "Create a new user")
    @ApiResponse(responseCode = "201", description = "User created",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = UserDTO.class, description = "New user")))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "user")
    ResponseEntity<UserDTO> createUser(UserDTO userDTO, UriComponentsBuilder uriBuilder);

    @Operation(summary = "Update user")
    @ApiResponse(responseCode = "200", description = "Updated user",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = UserDTO.class)))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                        schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "user")
    ResponseEntity<UserDTO> updateUser(UserDTO userDTO, @Parameter(description="User ID") Long id);

    @Operation(summary = "Get all users")
    @ApiResponse(responseCode = "200", description = "List of users",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                        schema = @Schema(implementation = UserDTO.class))))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "user")
    ResponseEntity<List<UserDTO>> getUsers();

    @Operation(summary = "Get user by ID")
    @ApiResponse(responseCode = "200", description = "User",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = UserDTO.class)))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "user")
    ResponseEntity<UserDTO> getUserById(@Parameter(description="User ID") Long id);

    @Operation(summary = "Delete user by ID")
    @ApiResponse(responseCode = "200", description = "Deleted user")
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "user")
    ResponseEntity<?> deleteUserById(@Parameter(description="User ID") Long id);

}
