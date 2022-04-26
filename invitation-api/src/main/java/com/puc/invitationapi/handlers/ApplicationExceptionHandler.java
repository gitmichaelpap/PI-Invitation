package com.puc.invitationapi.handlers;

import com.puc.invitationapi.exception.AuthException;
import com.puc.invitationapi.exception.GuestException;
import com.puc.invitationapi.exception.UserException;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<Object> handleEmptyResultDataAccessException(final RuntimeException ex, WebRequest request) {
        final String mensagemUsuario = messageSource.getMessage("recursoNaoEncontrado", null, LocaleContextHolder.getLocale());
        final String mensagemDesenvolvedor = ex.toString();
        List<Error> errors = Collections.singletonList(new Error(mensagemUsuario, mensagemDesenvolvedor));
        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentialsException(final RuntimeException ex, WebRequest request) {
        final String mensagemUsuario = "Credenciais Inválidas";
        final String mensagemDesenvolvedor = ex.toString();
        List<Error> errors = Collections.singletonList(new Error(mensagemUsuario, mensagemDesenvolvedor));
        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(final DataIntegrityViolationException ex, WebRequest request) {
        final String mensagemUsuario = messageSource.getMessage("naoFoiPossivelProcessarEntidade", null, LocaleContextHolder.getLocale());
        final String mensagemDesenvolvedor = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = Collections.singletonList(new Error(mensagemUsuario, mensagemDesenvolvedor));
        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.UNPROCESSABLE_ENTITY, request);
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(
        HttpMessageNotReadableException ex,
        HttpHeaders headers,
        HttpStatus status,
        WebRequest request) {
        final String mensagemUsuario = messageSource.getMessage("requisicaoInvalida", null, LocaleContextHolder.getLocale());
        final String mensagemDesenvolvedor = ex.getCause() != null ? ex.getCause().toString(): ex.toString();
        List<Error> errors = Collections.singletonList(new Error(mensagemUsuario, mensagemDesenvolvedor));
        return handleExceptionInternal(ex, errors, headers, HttpStatus.BAD_REQUEST, request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException ex,
        HttpHeaders headers,
        HttpStatus status,
        WebRequest request) {
        List<Error> errors = criarListaDeErros(ex.getBindingResult());
        return handleExceptionInternal(ex, errors, headers, HttpStatus.UNPROCESSABLE_ENTITY, request);
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public ResponseEntity<Object> handleDuplicateKeyException(DuplicateKeyException ex, WebRequest request) {
        final String mensagemUsuario = messageSource.getMessage("recursoExistente", null, LocaleContextHolder.getLocale());
        final String mensagemDesenvolvedor = ExceptionUtils.getRootCauseMessage(ex);
        List<Error> errors = Collections.singletonList(new Error(mensagemUsuario, mensagemDesenvolvedor));
        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.CONFLICT, request);
    }

    @ExceptionHandler({UserException.class, GuestException.class, AuthException.class})
    public ResponseEntity<Object> handleSidejudException(Exception ex, WebRequest request) {
        final String mensagemUsuario = ex.getMessage();
        final String mensagemDesenvolvedor;
        if (ObjectUtils.isEmpty(ex.getCause())) {
            mensagemDesenvolvedor = ex.getMessage();
        } else {
            mensagemDesenvolvedor = ex.getCause().toString();
        }
        List<Error> errors = Collections.singletonList(new Error(mensagemUsuario, mensagemDesenvolvedor));
        return handleExceptionInternal(ex, errors, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    private List<Error> criarListaDeErros(BindingResult bindingResult) {
        List<Error> errors = new ArrayList<>();

        for (FieldError fieldError: bindingResult.getFieldErrors()) {
            String mensagemUsuario = messageSource.getMessage(fieldError, LocaleContextHolder.getLocale());
            String mensagemDesenvolvedor = fieldError.toString();
            errors.add(new Error(mensagemUsuario, mensagemDesenvolvedor));
        }

        return errors;
    }

    public static class Error {

        private String mensagemUsuario;

        private String mensagemDesenvolvedor;

        public Error(String mensagemUsuario, String mensagemDesenvolvedor) {
            this.mensagemUsuario = mensagemUsuario;
            this.mensagemDesenvolvedor = mensagemDesenvolvedor;
        }

        public Error() {
        }

        public String getMensagemUsuario() {
            return mensagemUsuario;
        }

        public void setMensagemUsuario(String mensagemUsuario) {
            this.mensagemUsuario = mensagemUsuario;
        }

        public String getMensagemDesenvolvedor() {
            return mensagemDesenvolvedor;
        }

        public void setMensagemDesenvolvedor(String mensagemDesenvolvedor) {
            this.mensagemDesenvolvedor = mensagemDesenvolvedor;
        }
    }
}
