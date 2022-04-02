package com.puc.invitationapi.entites;

import com.sun.istack.NotNull;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "user", schema = "invitation")
public class User {

    @Id
    @SequenceGenerator(name = "user_id_seq", sequenceName = "user_id_seq", allocationSize = 1, schema = "invitation")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_seq")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "fiancee")
    private String fiancee;

    @NotNull
    @Column(name = "fiance")
    private String fiance;

    @NotNull
    @Column(name = "wedding_day")
    private LocalDateTime weddingDay;

    @NotNull
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Column(name = "password")
    private String password;

    @NotNull
    @Column(name = "data_register")
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
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
