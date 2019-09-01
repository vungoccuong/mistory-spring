package com.example.websocketdemo.entities;

import org.bson.types.ObjectId;

public class GroupInviteBody {

    private String userId;
    private String roomId;

    public GroupInviteBody(String userId, String roomId) {
        this.userId = userId;
        this.roomId = roomId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
