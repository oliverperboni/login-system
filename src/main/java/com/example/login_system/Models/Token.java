package com.example.login_system.Models;


import jakarta.persistence.*;

@Entity
@Table(name = "_token")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Integer id;

    @Column(name = "access_token")
    private String accessToken;

    @Column(name = "refresh_token")
    private String refreshToken;

    @Column(name = "is_logged_out")
    private boolean loggedOut;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Token(Integer id, String accessToken, String refreshToken, boolean loggedOut, User user) {
        this.id = id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.loggedOut = loggedOut;
        this.user = user;
    }
    public Token( String accessToken, String refreshToken, boolean loggedOut, User user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.loggedOut = loggedOut;
        this.user = user;
    }

    public Token() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String token) {
        this.accessToken = token;
    }

    public boolean isLoggedOut() {
        return loggedOut;
    }

    public void setLoggedOut(boolean loggedOut) {
        this.loggedOut = loggedOut;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
