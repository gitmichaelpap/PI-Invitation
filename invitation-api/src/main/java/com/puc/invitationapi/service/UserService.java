package com.puc.invitationapi.service;

import com.puc.invitationapi.dto.UserDTO;

import java.util.List;

public interface UserService {

    UserDTO createUser(UserDTO dto);

    UserDTO updateUser(UserDTO dto);

    List<UserDTO> getUsers();

    UserDTO getUserById(Long idUser);

    void deleteUserById(Long idUser);


}
