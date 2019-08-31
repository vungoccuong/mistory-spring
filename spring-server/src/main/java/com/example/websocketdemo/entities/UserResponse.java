package com.example.websocketdemo.entities;

import com.example.websocketdemo.controller.Responsible;
import com.example.websocketdemo.model.UserModel;
import org.bson.types.ObjectId;

public class UserResponse implements Responsible {
    private ObjectId _id;
    private String fullName;
    private String username;

    private UserResponse(ObjectId id, String fullName, String username) {
        this._id = id;
        this.fullName = fullName;
        this.username = username;
    }

    public String get_id() {
        return _id.toString();
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public static UserResponse fromModel(UserModel userModel) {
        return new UserResponse(userModel.getId(), userModel.getFullName(), userModel.getUsername());
    }



    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
