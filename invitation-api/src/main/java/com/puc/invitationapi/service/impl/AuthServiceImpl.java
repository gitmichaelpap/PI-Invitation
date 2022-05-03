package com.puc.invitationapi.service.impl;

import com.puc.invitationapi.config.JwtUserDetailsService;
import com.puc.invitationapi.config.JwtUtil;
import com.puc.invitationapi.dto.LoginDTO;
import com.puc.invitationapi.dto.Token;
import com.puc.invitationapi.dto.UserDTO;
import com.puc.invitationapi.exception.AuthException;
import com.puc.invitationapi.service.AuthService;
import com.puc.invitationapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public Token login(LoginDTO loginDTO) throws Exception {

        if (loginDTO.getEmail() == null || loginDTO.getPassword() == null) {
            throw new AuthException(AuthException.getErrorLogin());
        }
        Authentication authentication = authenticate(loginDTO.getEmail(), loginDTO.getPassword());
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        final String token = jwtTokenUtil.generateToken(userDetails);
        UserDTO user = userService.getByEmail(loginDTO.getEmail());
        if (user == null) {
            throw new AuthException(AuthException.getErrorLogin());
        }
        Token tokenResponse = new Token();
        user.setPassword(null);
        tokenResponse.setUser(user);
        tokenResponse.setAcessToken(token);
        return tokenResponse;
    }

    private Authentication authenticate(String username, String password) throws Exception {
        try {
             return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("INVALID_CREDENTIALS", e);
        }
    }

  }
