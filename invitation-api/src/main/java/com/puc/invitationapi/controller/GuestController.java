package com.puc.invitationapi.controller;

import com.puc.invitationapi.controller.doc.GuestControllerDoc;
import com.puc.invitationapi.dto.GuestDTO;
import com.puc.invitationapi.exception.GuestException;
import com.puc.invitationapi.service.GuestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class GuestController implements GuestControllerDoc {

    private static final String ENTITY_NAME_V1 = "/v1.0/guest";

    private final GuestService guestService;

    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @PostMapping(value = ENTITY_NAME_V1, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<GuestDTO> createGuest(@RequestBody GuestDTO guestDTO, UriComponentsBuilder uriBuilder) {
        GuestDTO guestDTOResult = guestService.createGuest(guestDTO);
        URI uri = uriBuilder.path(ENTITY_NAME_V1 + "/" + guestDTOResult.getId()).build().toUri();
        return ResponseEntity.created(uri).body(guestDTOResult);
    }

    @PutMapping(value = ENTITY_NAME_V1 + "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<GuestDTO> updateGuest(@RequestBody GuestDTO guestDTO, @PathVariable Long id) {
        if (!guestDTO.getId().equals(id)) {
            throw new GuestException(GuestException.getIdIncompativelObjeto());
        }
        GuestDTO guestDTOResult = guestService.updateGuest(guestDTO);
        return ResponseEntity.ok().body(guestDTOResult);
    }

    @GetMapping(value = ENTITY_NAME_V1, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<GuestDTO>> getGuests() {
        List<GuestDTO> guestDTOList = guestService.getGuests();
        if (guestDTOList == null || guestDTOList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(guestDTOList);
    }

    @GetMapping(value = ENTITY_NAME_V1 + "/user/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<GuestDTO>> getGuestsByUserId(@PathVariable Long userId) {
        List<GuestDTO> guestDTOList = guestService.getGuestsByUserId(userId);
        if (guestDTOList == null || guestDTOList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(guestDTOList);
    }

    @GetMapping(value = ENTITY_NAME_V1 + "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<GuestDTO> getGuestById(@PathVariable Long id) {
        GuestDTO guestDTO = guestService.getGuestById(id);
        if (guestDTO == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(guestDTO);
    }

    @DeleteMapping(ENTITY_NAME_V1 + "/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> deleteGuestById(@PathVariable Long id) {
        guestService.deleteGuestById(id);
        return ResponseEntity.ok().build();
    }

}
