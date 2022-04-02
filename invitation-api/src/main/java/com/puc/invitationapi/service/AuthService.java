package com.puc.invitationapi.service;

import com.puc.invitationapi.dto.LoginDTO;
import com.puc.invitationapi.dto.Token;

public interface AuthService {

    Token login(LoginDTO loginDTO);
}
