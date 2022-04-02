package com.puc.invitationapi.exception;

public class UserException extends RuntimeException {

    private static final String ID_INCOMPATIVEL_OBJETO = "O ID do usuário a ser editado é diferente do Código do Objeto";

    private static final String EMAIL_CADASTRADO = "E-mail já cadastrado no sistema!";

    private static final String CONVIDADOS_VINCULADOS = "Existem convidados vinculados a este usuário, favor deletar os convidados!";

    public UserException(String message) {
        super(message);
    }

    public static String getIdIncompativelObjeto() {
        return ID_INCOMPATIVEL_OBJETO;
    }

    public static String getEmailCadastrado() {
        return EMAIL_CADASTRADO;
    }

      public static String getConvidadosVinculados() {
        return CONVIDADOS_VINCULADOS;
    }

}
