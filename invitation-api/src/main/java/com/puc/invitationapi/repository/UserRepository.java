package com.puc.invitationapi.repository;

import com.puc.invitationapi.entites.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> getByEmail(String email);

    @Query(value = "select user from User user where user.email = :email and user.id <> :id")
    Optional<User> getByEmailAndNotId(@Param("email") String email,@Param("id") Long id);

}
