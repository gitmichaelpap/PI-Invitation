package com.puc.invitationapi.mappers;

import com.puc.invitationapi.dto.GuestDTO;
import com.puc.invitationapi.entites.Guest;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.control.DeepClone;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(mappingControl = DeepClone.class)
public interface GuestMapper {

    GuestMapper MAPPER = Mappers.getMapper( GuestMapper.class );

    Guest toGuest(GuestDTO guestDTO);

    List<Guest> toListGuest(List<GuestDTO> guestDTOList);

    @InheritInverseConfiguration
    GuestDTO fromGuest(Guest user);

    @InheritInverseConfiguration
    List<GuestDTO> fromListGuest(List<Guest> guest);
}
