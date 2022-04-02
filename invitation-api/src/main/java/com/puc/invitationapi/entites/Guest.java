package com.puc.invitationapi.entites;

import com.sun.istack.NotNull;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "guest", schema = "invitation")
public class Guest {

    @Id
    @SequenceGenerator(name = "guest_id_seq", sequenceName = "guest_id_seq", allocationSize = 1, schema = "invitation")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "guest_id_seq")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "guest")
    private String guest;

    @NotNull
    @Column(name = "qrcode")
    private String qrcode;

    @NotNull
    @Column(name = "host")
    private String host;

    @NotNull
    @Column(name = "confirmation")
    private boolean confirmation;

    @NotNull
    @Column(name = "confirmation_date")
    private LocalDateTime confirmationDate;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "id_user", foreignKey = @ForeignKey(name = "fk_guest_user"), referencedColumnName = "id")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGuest() {
        return guest;
    }

    public void setGuest(String guest) {
        this.guest = guest;
    }

    public String getQrcode() {
        return qrcode;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public boolean isConfirmation() {
        return confirmation;
    }

    public void setConfirmation(boolean confirmation) {
        this.confirmation = confirmation;
    }

    public LocalDateTime getConfirmationDate() {
        return confirmationDate;
    }

    public void setConfirmationDate(LocalDateTime confirmationDate) {
        this.confirmationDate = confirmationDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Guest)) return false;
        Guest guest1 = (Guest) o;
        return isConfirmation() == guest1.isConfirmation() && Objects.equals(getId(), guest1.getId())
                && Objects.equals(getGuest(), guest1.getGuest())
                && Objects.equals(getQrcode(), guest1.getQrcode())
                && Objects.equals(getHost(), guest1.getHost())
                && Objects.equals(getConfirmationDate(), guest1.getConfirmationDate())
                && Objects.equals(getUser(), guest1.getUser());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getGuest(), getQrcode(), getHost(), isConfirmation(), getConfirmationDate(), getUser());
    }
}
