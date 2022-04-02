package com.puc.invitationapi.mappers;

import com.puc.invitationapi.dto.UserDTO;
import com.puc.invitationapi.entites.User;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.control.DeepClone;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(mappingControl = DeepClone.class)
public interface UserMapper {

    UserMapper MAPPER = Mappers.getMapper( UserMapper.class );

    User toUser(UserDTO userDTO);

    List<User> toListUser(List<UserDTO> userDTOList);

    @InheritInverseConfiguration
    UserDTO fromUser(User user);

    @InheritInverseConfiguration
    List<UserDTO> fromListUser(List<User> user);
}
