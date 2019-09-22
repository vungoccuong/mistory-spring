package com.ltm2019.mistory.message;

import java.util.Date;

public class ChatMessage implements IMessage {
    private MessageTypes type = MessageTypes.TEXT;
    private String content;
    private String sender;
    private Date date = new Date();

    public MessageTypes getType() {
        return type;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Date getDate() {
        return date;
    }
}
