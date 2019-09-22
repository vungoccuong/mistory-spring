package com.ltm2019.mistory.message;


public class TypingMessage implements IMessage {
    private MessageTypes type = MessageTypes.TYPING;
    private String username;
    private boolean isTyping;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isTyping() {
        return isTyping;
    }

    public void setTyping(boolean isTyping) {
        this.isTyping = isTyping;
    }


    public MessageTypes getType() {
        return type;
    }

    @Override
    public String toString() {
        return "TypingMessage{" +
                "type=" + type +
                ", username='" + username + '\'' +
                ", isTyping=" + isTyping +
                '}';
    }

}
