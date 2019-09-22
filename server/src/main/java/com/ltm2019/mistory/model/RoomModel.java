package com.ltm2019.mistory.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "rooms")
public class RoomModel {
    @Id
    private ObjectId id;
    private String name;
    private List<ObjectId> members;
    private ObjectId creator;
    private String type;
    private ObjectId lastMessage;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ObjectId> getMembers() {
        return members;
    }

    public void setMembers(List<ObjectId> members) {
        this.members = members;
    }

    public ObjectId getCreator() {
        return creator;
    }

    public void setCreator(ObjectId creator) {
        this.creator = creator;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ObjectId getLastMessage() {
        return lastMessage;
    }

    public void setLastMessage(ObjectId lastMessage) {
        this.lastMessage = lastMessage;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
    public void setUpdateAtNow() {
        this.updatedAt = new Date();
    }
}
