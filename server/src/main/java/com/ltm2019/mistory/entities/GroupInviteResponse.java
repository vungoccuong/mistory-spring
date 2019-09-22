package com.ltm2019.mistory.entities;

import com.ltm2019.mistory.controller.Responsible;

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
