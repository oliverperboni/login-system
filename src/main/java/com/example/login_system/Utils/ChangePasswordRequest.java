package com.example.login_system.Utils;

import com.example.login_system.Models.User;

public class ChangePasswordRequest {
    
    String user;
    String newPassword;
    public ChangePasswordRequest(String user, String newPassword) {
        this.user = user;
        this.newPassword = newPassword;
    }
    public String getUser() {
        return user;
    }
    public void setUser(String user) {
        this.user = user;
    }
    public String getNewPassword() {
        return newPassword;
    }
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
 
    

}
