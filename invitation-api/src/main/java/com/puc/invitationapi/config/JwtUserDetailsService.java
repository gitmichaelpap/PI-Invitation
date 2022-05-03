package com.puc.invitationapi.config;

import com.puc.invitationapi.entites.User;
import com.puc.invitationapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> userOptional = userRepository.getByEmail(email);
        if (userOptional.isPresent()) {
            if (userOptional.get().getEmail().equals(email)) {
                return new org.springframework.security.core.userdetails.User(email, userOptional.get().getPassword(),
                        new ArrayList<>());
            } else {
                throw new UsernameNotFoundException("User not found with email: " + email);
            }
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }
}