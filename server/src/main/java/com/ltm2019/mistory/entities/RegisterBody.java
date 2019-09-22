package com.ltm2019.mistory.entities;

import javax.validation.constraints.Size;

public class RegisterBody {
    @Size(min = 4, max = 20)
    private String username;
    @Size(min = 4, max = 30)
    private String fullName;
    @Size(min = 4, max = 20)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
