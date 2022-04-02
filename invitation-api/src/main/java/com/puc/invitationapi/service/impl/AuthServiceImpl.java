package com.puc.invitationapi.service.impl;

import com.puc.invitationapi.dto.LoginDTO;
import com.puc.invitationapi.dto.Token;
import com.puc.invitationapi.exception.AuthException;
import com.puc.invitationapi.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Override
    public Token login(LoginDTO loginDTO) {
        if (loginDTO.getEmail() == null || loginDTO.getPassword() == null) {
            throw new AuthException(AuthException.getErrorLogin());
        }
        Token token = new Token();
        token.setAcessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        token.setRefreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
        return token;
    }

}
