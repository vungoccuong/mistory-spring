package com.ltm2019.mistory.service;

import com.ltm2019.mistory.dao.MessageDao;
import com.ltm2019.mistory.dao.RoomDao;
import com.ltm2019.mistory.exceptions.RoomNotFoundException;
import com.ltm2019.mistory.model.MessageModel;
import com.ltm2019.mistory.model.RoomModel;
import com.ltm2019.mistory.model.UserModel;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service("ChatUtil")
public class ChatService {
    private RoomDao roomDao;
    private MessageDao messageDao;
    public ChatService(RoomDao roomDao, MessageDao messageDao) {
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
