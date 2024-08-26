package com.example.login_system.Utils;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.example.login_system.Enums.Role;
import com.example.login_system.Models.User;

public class UserJSONResquest {

    String username;

    String email;

    Role role;

    public UserJSONResquest(String username, String email, Role role) {
        this.username = username;
        this.email = email;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    static public List<UserJSONResquest> convert(List<User> users) {
        List<UserJSONResquest> result = new LinkedList<UserJSONResquest>();
        for (User user : users) {
            UserJSONResquest aux = new UserJSONResquest(user.getUsername(), user.getEmail(), user.getRole());
            result.add(aux);
        }
        return result;
    }

}
