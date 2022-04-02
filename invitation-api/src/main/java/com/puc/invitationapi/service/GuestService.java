package com.puc.invitationapi.service;

import com.puc.invitationapi.dto.GuestDTO;

import java.util.List;

public interface GuestService {

    GuestDTO createGuest(GuestDTO dto);

    GuestDTO updateGuest(GuestDTO dto);

    List<GuestDTO> getGuests();

    GuestDTO getGuestById(Long idGuest);

    void deleteGuestById(Long idGuest);

    List<GuestDTO> getGuestsByUserId(Long userId);

    boolean existGuestByUser(Long idUser);
}
