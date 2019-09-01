package com.example.websocketdemo.entities;

import com.example.websocketdemo.controller.Responsible;
import com.example.websocketdemo.dao.MessageDao;
import com.example.websocketdemo.dao.UserDao;
import com.example.websocketdemo.model.MessageModel;
import com.example.websocketdemo.model.RoomModel;
import com.example.websocketdemo.model.UserModel;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class RoomResponse implements Responsible {
    private RoomModel model;
    private MessageResponse lastMessage;
    private List<UserResponse> members;
    private String avatar = "";

    private RoomResponse(RoomModel roomModel) {
        this.model = roomModel;
        members = new ArrayList<>();
    }

    public static RoomResponse fromModel(RoomModel roomModel) {
        return new RoomResponse(roomModel);
    }

    public String get_id() {
        return model.getId().toString();
    }

    public void set_id(ObjectId id) {
        model.setId(id);
    }

    public String getName() {
        return model.getName();
    }

    public void setName(String name) {
        model.setName(name);
    }

    public List<UserResponse> getMembers() {
        return members;
    }

    public void setMembers(List<UserResponse> members) {
        this.members = members;
    }


    public String getType() {
        return model.getType();
    }


    public MessageResponse getLastMessage() {
        return lastMessage;
    }

    private void setLastMessage(MessageResponse lastMessage) {
        this.lastMessage = lastMessage;
    }

    private void setLastMessage(MessageModel lastMessage) {
        this.lastMessage = MessageResponse.fromModel(lastMessage);
    }

    public Date getCreatedAt() {
        return model.getCreatedAt();
    }

    public Date getUpdatedAt() {
        return model.getUpdatedAt();
    }

    public void makeLastMessage(MessageDao messageDao) {
        if (model.getLastMessage() != null) {
            messageDao.get(model.getLastMessage().toString()).ifPresent(this::setLastMessage);
        }
    }

    public void makeMembers(UserDao userDao) {
        this.members =
                this.model.getMembers().stream().map(i -> {
                    Optional<UserModel> userModel = userDao.get(i.toString());
                    return userModel.map(UserResponse::fromModel).orElse(null);
                }).collect(Collectors.toList());
    }

    public void makeAvatar(String currentUser) {
        if (model.getType().equals("inbox")) {
            makeInboxAvatar(currentUser);
        } else {
            makeGroupAvatar(currentUser);
        }
    }

    private void makeInboxAvatar(String currentUser) {
        UserResponse friend = members.get(0);
        for (UserResponse member : members) {
            if (member.getUsername().equals(currentUser)) {
                friend = member;
                break;
            }
        }
        this.setName(friend.getFullName());
        this.setAvatar(friend.getFullName().substring(0, 2).toUpperCase());
    }

    private void makeGroupAvatar(String currentUser) {
        String name = makeFullNameGroup(currentUser);
        this.setName(name);
        this.setAvatar(name);
    }

    private String makeFullNameGroup(String currentUser) {
        if (members.size() == 1) {
            return members.get(0).getFullName().toUpperCase().substring(0, 1);
        } else {
            return members.stream().filter(member -> !member.getUsername().equals(currentUser))
                    .map(UserResponse::getFullName)
                    .reduce("", (acc, el) -> acc + el.substring(0, 1).toUpperCase());
        }
    }


    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
