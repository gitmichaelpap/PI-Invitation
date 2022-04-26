package com.puc.invitationapi.controller;

import com.puc.invitationapi.controller.doc.UserControllerDoc;
import com.puc.invitationapi.dto.UserDTO;
import com.puc.invitationapi.exception.UserException;
import com.puc.invitationapi.handlers.ApplicationExceptionHandler;
import com.puc.invitationapi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin
public class UserController implements UserControllerDoc {

    private static final String ENTITY_NAME_V1 = "/v1.0/user";

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = ENTITY_NAME_V1, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO, UriComponentsBuilder uriBuilder) {
        UserDTO userDTOResult = userService.createUser(userDTO);
        URI uri = uriBuilder.path(ENTITY_NAME_V1 + "/" + userDTOResult.getId()).build().toUri();
        return ResponseEntity.created(uri).body(userDTOResult);
    }

    @PutMapping(value = ENTITY_NAME_V1 + "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id) {
        if (!userDTO.getId().equals(id)) {
            throw new UserException(UserException.getIdIncompativelObjeto());
        }
        UserDTO userDTOResult = userService.updateUser(userDTO);
        return ResponseEntity.ok().body(userDTOResult);
    }

    @GetMapping(value = ENTITY_NAME_V1, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<List<UserDTO>> getUsers() {
        List<UserDTO> userDTOList = userService.getUsers();
        if (userDTOList == null || userDTOList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(userDTOList);
    }

    @GetMapping(value = ENTITY_NAME_V1 + "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO userDTO = userService.getUserById(id);
        if (userDTO == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(userDTO);
    }

    @DeleteMapping(ENTITY_NAME_V1 + "/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok().build();
    }

}
