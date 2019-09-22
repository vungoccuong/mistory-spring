package com.ltm2019.mistory.controller;

import com.ltm2019.mistory.dao.MessageDao;
import com.ltm2019.mistory.dao.RoomDao;
import com.ltm2019.mistory.dao.UserDao;
import com.ltm2019.mistory.entities.MessageResponse;
import com.ltm2019.mistory.exceptions.RoomNotFoundException;
import com.ltm2019.mistory.model.RoomModel;
import com.ltm2019.mistory.model.UserModel;
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
    private UserDao userDao;

    public MessageController(MessageDao messageDao, RoomDao roomDao, UserDao userDao) {
        this.messageDao = messageDao;
        this.roomDao = roomDao;
        this.userDao = userDao;
    }

    @GetMapping("/{id}")
    public List<Responsible> getMessages(@PathVariable("id") String _id, Authentication authentication)
            throws RoomNotFoundException {
        UserModel userModel = (UserModel) authentication.getCredentials();
        ObjectId userId = userModel.getId();
        //
        ObjectId id = roomDao.findOrCreateId(userDao, userId, _id);
        RoomModel room = roomDao.findByIdAndUserId(id, userId);
        if (room == null) {
            throw new RoomNotFoundException();
        }
        return messageDao.getInRoom(room.getId()).stream().map(MessageResponse::fromModel).collect(Collectors.toList());

    }
}
