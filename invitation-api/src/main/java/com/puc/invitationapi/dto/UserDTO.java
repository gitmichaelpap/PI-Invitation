package com.puc.invitationapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;
import java.util.Objects;

public class UserDTO {

    @JsonProperty(value = "id")
    private Long id;

    private String fiancee;

    private String fiance;

    private LocalDateTime weddingDay;

    private String email;

    private String password;

    private LocalDateTime dtRegister;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFiancee() {
        return fiancee;
    }

    public void setFiancee(String fiancee) {
        this.fiancee = fiancee;
    }

    public String getFiance() {
        return fiance;
    }

    public void setFiance(String fiance) {
        this.fiance = fiance;
    }

    public LocalDateTime getWeddingDay() {
        return weddingDay;
    }

    public void setWeddingDay(LocalDateTime weddingDay) {
        this.weddingDay = weddingDay;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getDtRegister() {
        return dtRegister;
    }

    public void setDtRegister(LocalDateTime dtRegister) {
        this.dtRegister = dtRegister;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserDTO)) return false;
        UserDTO userDTO = (UserDTO) o;
        return Objects.equals(getId(), userDTO.getId())
                && Objects.equals(getFiancee(), userDTO.getFiancee())
                && Objects.equals(getFiance(), userDTO.getFiance())
                && Objects.equals(getWeddingDay(), userDTO.getWeddingDay())
                && Objects.equals(getEmail(), userDTO.getEmail())
                && Objects.equals(getPassword(), userDTO.getPassword())
                && Objects.equals(getDtRegister(), userDTO.getDtRegister());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getFiancee(), getFiance(), getWeddingDay(), getEmail(), getPassword(), getDtRegister());
    }
}
