package com.example.websocketdemo.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.security.auth.Subject;
import java.security.Principal;
@Document(collection = "users")
public class UserModel implements Principal {


    @Id
    private ObjectId id;
    private String username;
    private String fullName;
    private String avatar;
    private String hashPassword;
    private String lastOnline;
    private String createdAt;

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getHashPassword() {
        return hashPassword;
    }

    public void setHashPassword(String hashPassword) {
        this.hashPassword = hashPassword;
    }

    public String getLastOnline() {
        return lastOnline;
    }

    public void setLastOnline(String lastOnline) {
        this.lastOnline = lastOnline;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    private String updatedAt;

    public UserModel(ObjectId id, String username, String fullName, String avatar, String hashPassword, String lastOnline, String createdAt, String updatedAt) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.avatar = avatar;
        this.hashPassword = hashPassword;
        this.lastOnline = lastOnline;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //get and set
    @Override
    public String getName() {
        return this.username;
    }

    @Override
    public boolean implies(Subject subject) {
        return false;
    }

    @Override
    public String toString() {
        return "UserModel{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", fullName='" + fullName + '\'' +
                ", avatar='" + avatar + '\'' +
                ", hashPassword='" + hashPassword + '\'' +
                ", lastOnline='" + lastOnline + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                '}';
    }
}
