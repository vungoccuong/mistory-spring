package com.example.websocketdemo.message;

public class FileMessage implements IMessage {
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
