package com.example.websocketdemo.model;

import com.example.websocketdemo.message.ChatMessage;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "messages")
public class MessageModel {
    private ObjectId id;
    private String sender;
    private ObjectId senderId;
    private String content;
    private ObjectId room;
    private Date date = new Date();
    private MessageTypes type = MessageTypes.text;

    public MessageModel(String sender, ObjectId senderId, String content, String room) {
        this.sender = sender;
        this.senderId = senderId;
        this.content = content;
        this.room = new ObjectId(room);
    }
    public MessageModel(UserModel user, ChatMessage message, String room) {
        this.sender = user.getUsername();
        this.senderId = user.getId();
        this.content = message.getContent();
        this.room = new ObjectId(room);
    }

    enum MessageTypes {
        text,
        file,
        image
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public ObjectId getSenderId() {
        return senderId;
    }

    public void setSenderId(ObjectId senderId) {
        this.senderId = senderId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ObjectId getRoom() {
        return room;
    }

    public void setRoom(ObjectId room) {
        this.room = room;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public MessageTypes getType() {
        return type;
    }

    public void setType(MessageTypes type) {
        this.type = type;
    }
}
