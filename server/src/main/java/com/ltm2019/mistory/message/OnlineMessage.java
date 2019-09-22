package com.ltm2019.mistory.message;

public class OnlineMessage implements IMessage {
    private MessageTypes type = MessageTypes.ONLINE;
    private String username;
    private boolean online;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public MessageTypes getType() {
        return type;
    }
}
