package com.example.login_system.Models;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class RecoverToken {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String token;

    private LocalTime expires_at;

    public RecoverToken() {
    }

    public RecoverToken(User user, String token, LocalTime expires_at) {
        this.user = user;
        this.token = token;
        this.expires_at = expires_at;
    }

    public RecoverToken(Integer id, User user, String token, LocalTime expires_at) {
        this.id = id;
        this.user = user;
        this.token = token;
        this.expires_at = expires_at;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalTime getExpires_at() {
        return expires_at;
    }

    public void setExpires_at(LocalTime expires_at) {
        this.expires_at = expires_at;
    }

}
