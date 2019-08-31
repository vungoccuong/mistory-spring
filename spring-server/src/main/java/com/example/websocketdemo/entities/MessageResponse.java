package com.example.websocketdemo.entities;

import com.example.websocketdemo.controller.Responsible;
import com.example.websocketdemo.model.MessageModel;

import java.util.Date;

public class MessageResponse implements Responsible {
    private String id;
    private String sender;
    private String senderId;
    private String content;
    private String room;
    private Date date = new Date();
    private MessageModel.MessageTypes type = MessageModel.MessageTypes.text;

    public static MessageResponse fromModel(MessageModel messageModel) {
        MessageResponse message = new MessageResponse();
        message.id = messageModel.getId().toString();
        message.sender = messageModel.getSender();
        message.senderId = messageModel.getSenderId().toString();
        message.content = messageModel.getContent();
        message.room = messageModel.getRoom().toString();
        message.date = messageModel.getDate();
        message.type = messageModel.getType();
        return message;
    }

    public String get_id() {
        return id;
    }

    public String getSender() {
        return sender;
    }

    public String getSenderId() {
        return senderId;
    }

    public String getContent() {
        return content;
    }

    public String getRoom() {
        return room;
    }

    public Date getDate() {
        return date;
    }

    public MessageModel.MessageTypes getType() {
        return type;
    }
}
