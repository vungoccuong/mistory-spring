package com.example.websocketdemo.controller;

import com.example.websocketdemo.dao.RoomDao;
import com.example.websocketdemo.dao.UserDao;
import com.example.websocketdemo.entities.*;
import com.example.websocketdemo.exceptions.RoomNotFoundException;
import com.example.websocketdemo.model.RoomModel;
import com.example.websocketdemo.model.UserModel;
import org.bson.types.ObjectId;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/group")
public class GroupController {
    private RoomDao roomDao;
    private UserDao userDao;

    public GroupController(RoomDao roomDao, UserDao userDao) {
        this.roomDao = roomDao;
        this.userDao = userDao;
    }

    @PostMapping("/")
    @ResponseBody
    public Responsible createGroup(Authentication authentication) {
        UserModel userModel = (UserModel) authentication.getCredentials();
        return RoomResponse.fromModel(roomDao.findOrCreateGroup(userModel.getId()));
    }

    @PostMapping("/invite")
    @ResponseBody
    public Responsible inviteMember(@Valid @ModelAttribute GroupInviteBody body, Authentication authentication)
            throws RoomNotFoundException {
        UserModel userModel = (UserModel) authentication.getCredentials();
        RoomModel
                roomModel =
                roomDao.insertMemberToRoom(new ObjectId(body.getRoomId()), userModel.getId(),
                        new ObjectId(body.getUserId()));
        if (roomModel == null) {
            throw new RoomNotFoundException();
        } else {
            userModel = userDao.get(body.getUserId()).get();
            UserResponse userResponse = UserResponse.fromModel(userModel);
            return new GroupInviteResponse(userResponse);
        }
    }

    @PostMapping("/remove")
    public Responsible removeMember(Authentication authentication, @Valid @ModelAttribute GroupInviteBody body)
            throws RoomNotFoundException {
        UserModel userModel = (UserModel) authentication.getCredentials();
        RoomModel
                roomModel =
                roomDao.removeMemberFromRoom(new ObjectId(body.getRoomId()), userModel.getId(),
                        new ObjectId(body.getUserId()));
        if (roomModel == null) {
            throw new RoomNotFoundException();
        } else {
            return new GroupRemoveResponse(body.getUserId());
        }
    }

}
