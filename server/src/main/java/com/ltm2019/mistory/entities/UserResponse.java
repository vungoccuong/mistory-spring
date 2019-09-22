package com.ltm2019.mistory.entities;

import com.ltm2019.mistory.controller.Responsible;
import com.ltm2019.mistory.model.UserModel;
import org.bson.types.ObjectId;

public class UserResponse implements Responsible {
    private ObjectId _id;
    private String fullName;
    private String username;
    private String avatar;

    private UserResponse(ObjectId id, String fullName, String username) {
        this._id = id;
        this.fullName = fullName;
        this.username = username;
    }

    private UserResponse(ObjectId id, String fullName, String username, String avatar) {
        this._id = id;
        this.fullName = fullName;
        this.username = username;
        this.avatar = avatar;
    }

    public static UserResponse fromModel(UserModel userModel) {
        return new UserResponse(userModel.getId(), userModel.getFullName(), userModel.getUsername(),
                userModel.getAvatar());
    }

    public String get_id() {
        return _id.toString();
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
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
