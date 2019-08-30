package com.example.websocketdemo.utils;

import com.example.websocketdemo.dao.MessageDao;
import com.example.websocketdemo.dao.RoomDao;
import com.example.websocketdemo.exceptions.RoomNotFoundException;
import com.example.websocketdemo.model.MessageModel;
import com.example.websocketdemo.model.RoomModel;
import com.example.websocketdemo.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service("ChatUtil")
public class ChatUtil {
    private RoomDao roomDao;
    private MessageDao messageDao;
    public ChatUtil(RoomDao roomDao, MessageDao messageDao) {
        this.roomDao = roomDao;
        this.messageDao = messageDao;
    }

    public RoomModel getRoomModel(String roomId) throws RoomNotFoundException {
        Optional<RoomModel> roomModelOptional = roomDao.get(roomId);
        if (roomModelOptional.isPresent()) {
            return roomModelOptional.get();
        }
        throw new RoomNotFoundException();
    }
    public void saveAndUpdateLastMessage(MessageModel messageModel, UserModel user, RoomModel roomModel) {
        MessageModel message = messageDao.insert(messageModel);
        roomModel.setLastMessage(message.getId());
        roomDao.update(roomModel);
    }
}
