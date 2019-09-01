package com.example.websocketdemo.entities;

import com.example.websocketdemo.controller.Responsible;

public class GroupInviteResponse implements Responsible {
    private String status = "success";
    private UserResponse data;

    public GroupInviteResponse( UserResponse data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserResponse getData() {
        return data;
    }

    public void setData(UserResponse data) {
        this.data = data;
    }

}
