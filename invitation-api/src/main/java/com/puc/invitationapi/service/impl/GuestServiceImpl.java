package com.puc.invitationapi.service.impl;

import com.puc.invitationapi.dto.GuestDTO;
import com.puc.invitationapi.entites.Guest;
import com.puc.invitationapi.entites.User;
import com.puc.invitationapi.mappers.GuestMapper;
import com.puc.invitationapi.repository.GuestRepository;
import com.puc.invitationapi.service.GuestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuestServiceImpl implements GuestService {

    private final GuestRepository guestRepository;

    public GuestServiceImpl(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    @Override
    public GuestDTO createGuest(GuestDTO dto) {
        Guest guest = GuestMapper.MAPPER.toGuest(dto);
        guest = guestRepository.save(guest);
        return GuestMapper.MAPPER.fromGuest(guest);
    }

    @Override
    public GuestDTO updateGuest(GuestDTO dto) {
        Guest guest = GuestMapper.MAPPER.toGuest(dto);
        guest = guestRepository.save(guest);
        return GuestMapper.MAPPER.fromGuest(guest);
    }

    @Override
    public List<GuestDTO> getGuests() {
        List<Guest> guestList = guestRepository.findAll();
        return GuestMapper.MAPPER.fromListGuest(guestList);
    }

    @Override
    public GuestDTO getGuestById(Long idGuest) {
        Optional<Guest> optionalGuest = guestRepository.findById(idGuest);
        return optionalGuest.map(GuestMapper.MAPPER::fromGuest).orElse(null);
    }

    @Override
    public void deleteGuestById(Long idGuest) {
        guestRepository.deleteById(idGuest);
    }

    @Override
    public List<GuestDTO> getGuestsByUserId(Long userId) {
        User user = new User();
        user.setId(userId);
        List<Guest> guestList = guestRepository.findGuestByUser(user);
        return GuestMapper.MAPPER.fromListGuest(guestList);
    }

    @Override
    public boolean existGuestByUser(Long idUser) {
        List<GuestDTO> guestDTOS = getGuestsByUserId(idUser);
        return guestDTOS != null && !guestDTOS.isEmpty();
    }
}
