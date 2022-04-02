package com.puc.invitationapi.exception;

public class GuestException extends RuntimeException {

    private static final String ID_INCOMPATIVEL_OBJETO = "O ID do usuário a ser editado é diferente do Código do Objeto";

    public GuestException(String message) {
        super(message);
    }

    public static String getIdIncompativelObjeto() {
        return ID_INCOMPATIVEL_OBJETO;
    }

}
