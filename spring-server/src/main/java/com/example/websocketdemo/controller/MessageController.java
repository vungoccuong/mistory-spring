package com.example.websocketdemo.controller;

import com.example.websocketdemo.dao.MessageDao;
import com.example.websocketdemo.dao.RoomDao;
import com.example.websocketdemo.entities.MessageResponse;
import com.example.websocketdemo.exceptions.RoomNotFoundException;
import com.example.websocketdemo.model.RoomModel;
import com.example.websocketdemo.model.UserModel;
import org.bson.types.ObjectId;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/message")
public class MessageController {
    private MessageDao messageDao;
    private RoomDao roomDao;
    public MessageController(MessageDao messageDao, RoomDao roomDao) {
        this.messageDao = messageDao;
        this.roomDao = roomDao;
    }

    @GetMapping("/{id}")
    public List<Responsible> getMessages(@PathVariable ObjectId id, Authentication authentication)
            throws RoomNotFoundException {
        UserModel userModel = (UserModel) authentication.getCredentials();
        ObjectId userId = userModel.getId();
        RoomModel room = roomDao.findByIdAndUserId(id, userId);
        if(room == null) {
            throw new RoomNotFoundException();
        }
        return messageDao.getInRoom(room.getId()).stream().map(MessageResponse::fromModel).collect(Collectors.toList());

    }
}
