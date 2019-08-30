package com.example.websocketdemo.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "rooms")
public class RoomModel {
    @Id
    private ObjectId id;
    private String name;
    private List<ObjectId> members;
    private ObjectId objectId;
    private String type;
    private ObjectId lastMessage;

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

    public ObjectId getObjectId() {
        return objectId;
    }

    public void setObjectId(ObjectId objectId) {
        this.objectId = objectId;
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
}
