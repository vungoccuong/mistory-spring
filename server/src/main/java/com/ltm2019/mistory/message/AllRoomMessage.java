package com.ltm2019.mistory.message;

import java.util.List;

public class AllRoomMessage implements IMessage {
    private MessageTypes type = MessageTypes.ALL_ROOMS;
    private List<String> rooms;

    public MessageTypes getType() {
        return type;
    }

    public List<String> getRooms() {
        return rooms;
    }

    public void setRooms(List<String> rooms) {
        this.rooms = rooms;
    }


}
