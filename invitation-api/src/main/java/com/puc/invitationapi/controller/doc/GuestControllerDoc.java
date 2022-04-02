package com.puc.invitationapi.controller.doc;

import com.puc.invitationapi.dto.GuestDTO;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

public interface GuestControllerDoc {

    @Operation(summary = "Create a new guest")
    @ApiResponse(responseCode = "201", description = "Guest created",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = GuestDTO.class, description = "New guest")))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "guest")
    ResponseEntity<GuestDTO> createGuest(GuestDTO guestDTO, UriComponentsBuilder uriBuilder);

    @Operation(summary = "Update guest")
    @ApiResponse(responseCode = "200", description = "Updated guest",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = GuestDTO.class)))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "guest")
    ResponseEntity<GuestDTO> updateGuest(@RequestBody GuestDTO guestDTO, @PathVariable Long id);

    @Operation(summary = "Get all guests")
    @ApiResponse(responseCode = "200", description = "List of guests",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = GuestDTO.class))))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "guest")
    ResponseEntity<List<GuestDTO>> getGuests();

    @Operation(summary = "Get guests by id user")
    @ApiResponse(responseCode = "200", description = "List of Guests",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                        schema = @Schema(implementation = GuestDTO.class))))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "guest")
    ResponseEntity<List<GuestDTO>> getGuestsByUserId(@Parameter(description="User ID") Long userId);

    @Operation(summary = "Get guest by ID")
    @ApiResponse(responseCode = "200", description = "Guest",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    schema = @Schema(implementation = GuestDTO.class)))
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "guest")
    ResponseEntity<GuestDTO> getGuestById(@Parameter(description="Guest ID") Long id);

    @Operation(summary = "Delete guest by ID")
    @ApiResponse(responseCode = "200", description = "Deleted guest")
    @ApiResponse(responseCode = "400", description = "List of possible errors",
            content = @Content(
                    mediaType = MediaType.APPLICATION_JSON_VALUE,
                    array = @ArraySchema(
                            schema = @Schema(implementation = ApplicationExceptionHandler.Error.class))))
    @Tag(name = "guest")
    ResponseEntity<?> deleteGuestById(@Parameter(description="Guest ID") Long id);

}
