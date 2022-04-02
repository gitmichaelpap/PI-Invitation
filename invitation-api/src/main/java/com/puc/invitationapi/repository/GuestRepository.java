package com.puc.invitationapi.repository;

import com.puc.invitationapi.entites.Guest;
import com.puc.invitationapi.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {

    List<Guest> findGuestByUser(User user);

}
