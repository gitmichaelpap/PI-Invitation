package com.puc.invitationapi.service.impl;

import com.puc.invitationapi.dto.UserDTO;
import com.puc.invitationapi.entites.User;
import com.puc.invitationapi.exception.UserException;
import com.puc.invitationapi.mappers.UserMapper;
import com.puc.invitationapi.repository.UserRepository;
import com.puc.invitationapi.service.GuestService;
import com.puc.invitationapi.service.UserService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final GuestService guestService;

    public UserServiceImpl(UserRepository userRepository, GuestService guestService) {
        this.userRepository = userRepository;
        this.guestService = guestService;
    }

    @Override
    public UserDTO createUser(UserDTO dto) {
        validateUserEmail(dto);
        User user = UserMapper.MAPPER.toUser(dto);
        user.setDtRegister(LocalDateTime.now());
        user = userRepository.save(user);
        return UserMapper.MAPPER.fromUser(user);
    }

    @Override
    public UserDTO updateUser(UserDTO dto) {
        validateUserEmail(dto);
        User user = UserMapper.MAPPER.toUser(dto);
        user = userRepository.save(user);
        return UserMapper.MAPPER.fromUser(user);
    }

    @Override
    public List<UserDTO> getUsers() {
        return UserMapper.MAPPER.fromListUser(userRepository.findAll());
    }

    @Override
    public UserDTO getUserById(Long idUser) {
        Optional<User> optionalUser = userRepository.findById(idUser);
        return optionalUser.map(UserMapper.MAPPER::fromUser).orElse(null);
    }

    @Override
    public void deleteUserById(Long idUser) {
        if (!guestService.existGuestByUser(idUser)) {
            userRepository.deleteById(idUser);
        }
        throw new UserException(UserException.getConvidadosVinculados());
    }

    @Override
    public UserDTO login(String email, String password) {
        Optional<User> userOptional = userRepository.getByEmailAndPassword(email, password);
        return userOptional.map(UserMapper.MAPPER::fromUser).orElse(null);
    }

    private void validateUserEmail(UserDTO userDTO) {
        Optional<User> userOptional;
        if (userDTO.getId() == null) {
            userOptional = userRepository.getByEmail(userDTO.getEmail());
        } else {
            userOptional = userRepository.getByEmailAndNotId(userDTO.getEmail(), userDTO.getId());
        }
        if (userOptional.isPresent()) {
            throw new UserException(UserException.getEmailCadastrado());
        }
    }
}
