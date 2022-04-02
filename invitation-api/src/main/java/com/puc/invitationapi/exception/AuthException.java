package com.puc.invitationapi.exception;

public class AuthException extends RuntimeException {

    private static final String ERROR_LOGIN = "E-mail ou senha inválidos!";

    public AuthException(String message) {
        super(message);
    }

    public static String getErrorLogin() {
        return ERROR_LOGIN;
    }

}
