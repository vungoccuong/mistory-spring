package com.example.websocketdemo.controller;

import com.example.websocketdemo.dao.RoomDao;
import com.example.websocketdemo.exceptions.RoomNotFoundException;
import com.example.websocketdemo.message.*;
import com.example.websocketdemo.model.MessageModel;
import com.example.websocketdemo.model.RoomModel;
import com.example.websocketdemo.model.UserModel;
import com.example.websocketdemo.service.ChatService;
import com.example.websocketdemo.utils.IUserManager;
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

@Controller
public class ChatController {
    private final RoomDao roomDao;
    private final IUserManager userManager;
    private final ChatService chatService;
    private SimpMessagingTemplate template;

    public ChatController(SimpMessagingTemplate template, RoomDao roomDao, IUserManager userManager,
                          ChatService chatService) {
        this.template = template;
        this.roomDao = roomDao;
        this.userManager = userManager;
        this.chatService = chatService;
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

    @MessageMapping("/{roomId}/chat.sendFile")
    public IMessage sendFile(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        return chatMessage;
    }

    @MessageMapping("/chat/{roomId}/file")
    @SendTo("/topic/{roomId}")
    public IMessage file(@Payload FileMessage message, SimpMessageHeaderAccessor headerAccessor) {
        return message;
    }
}
