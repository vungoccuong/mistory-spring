package com.ltm2019.mistory.controller;

import com.ltm2019.mistory.dao.FileDao;
import com.ltm2019.mistory.dao.RoomDao;
import com.ltm2019.mistory.exceptions.RoomNotFoundException;
import com.ltm2019.mistory.message.*;
import com.ltm2019.mistory.model.FileModel;
import com.ltm2019.mistory.model.MessageModel;
import com.ltm2019.mistory.model.RoomModel;
import com.ltm2019.mistory.model.UserModel;
import com.ltm2019.mistory.service.ChatService;
import com.ltm2019.mistory.utils.IUserManager;
import org.bson.types.ObjectId;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
public class ChatController {
    private final RoomDao roomDao;
    private final IUserManager userManager;
    private final ChatService chatService;
    private final FileDao fileDao;
    private final SimpMessagingTemplate template;

    public ChatController(SimpMessagingTemplate template, RoomDao roomDao, IUserManager userManager,
                          ChatService chatService, FileDao fileDao) {
        this.template = template;
        this.roomDao = roomDao;
        this.userManager = userManager;
        this.chatService = chatService;
        this.fileDao = fileDao;
    }

    @MessageMapping("/chat/room")
    public void getAllRoom(SimpMessageHeaderAccessor accessor) {
        AllRoomMessage msg = new AllRoomMessage();
        UserModel user = (UserModel) accessor.getUser();
        List<RoomModel> rooms = roomDao.getAllMemberRooms(user.getId());
        ArrayList<String> roomIds = new ArrayList<>();
        for (RoomModel room : rooms) {
            roomIds.add(room.getId().toString());
        }
        msg.setRooms(roomIds);
        template.convertAndSendToUser(user.getName(), "/queue/reply", msg);
    }


    @MessageMapping("/chat/{roomId}/message")
    @SendTo("/topic/{roomId}")
    public IMessage sendMessage(@Payload ChatMessage chatMessage, @DestinationVariable String roomId,
                                SimpMessageHeaderAccessor accessor)
            throws RoomNotFoundException {
        RoomModel roomModel = chatService.getRoomModel(roomId);
        UserModel user = (UserModel) accessor.getUser();
        assert user != null;
        MessageModel message = MessageModel.fromUserModel(user, chatMessage, new ObjectId(roomId));
        chatService.saveAndUpdateLastMessage(message, user, roomModel);
        chatMessage.setSender(user.getName());
        return chatMessage;
    }

    @MessageMapping("/chat/{roomId}/typing")
    @SendTo("/topic/{roomId}")
    public IMessage isTyping(@Payload TypingMessage message, SimpMessageHeaderAccessor headerAccessor) {
        UserModel user = (UserModel) headerAccessor.getUser();
        assert user != null;
        message.setUsername(user.getName());
        return message;
    }

    @MessageMapping("/online")
    public void isOnline(@Payload OnlineMessage message, SimpMessageHeaderAccessor headerAccessor) {
        boolean isOnline = userManager.isOnline(message.getUsername());
        message.setOnline(isOnline);
        template.convertAndSendToUser(headerAccessor.getUser().getName(), "/queue/reply", message);
    }


    @MessageMapping("/chat/{roomId}/file")
    @SendTo("/topic/{roomId}")
    public IMessage file(@Payload FileMessage message, SimpMessageHeaderAccessor headerAccessor) {
        Optional<FileModel> fileModelOptional= fileDao.get(message.getId());
        if(fileModelOptional.isPresent()) {
            FileModel fileModel = fileModelOptional.get();

        }
        System.out.println(message.getId());
        return message;
    }
}
