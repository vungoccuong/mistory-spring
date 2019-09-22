package com.ltm2019.mistory.controller;

import com.ltm2019.mistory.dao.RoomDao;
import com.ltm2019.mistory.dao.UserDao;
import com.ltm2019.mistory.entities.*;
import com.ltm2019.mistory.exceptions.RoomNotFoundException;
import com.ltm2019.mistory.model.RoomModel;
import com.ltm2019.mistory.model.UserModel;
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
