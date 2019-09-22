package com.ltm2019.mistory.dao;

import com.ltm2019.mistory.model.MessageModel;
import com.ltm2019.mistory.repository.MessageRepository;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("MessageService")
public class MessageDao implements IDao<MessageModel> {
    private final MessageRepository messageRepository;

    public MessageDao(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<MessageModel> getAll() {
        return null;
    }

    @Override
    public Optional<MessageModel> get(String id) {
        var a = messageRepository.findById((id));
        return a;
    }

    @Override
    public void update(MessageModel record) {

    }

    @Override
    public void delete(MessageModel record) {

    }

    public MessageModel insert(MessageModel record) {
        return this.messageRepository.insert(record);
    }
    public List<MessageModel> getInRoom(ObjectId id) {
        return this.messageRepository.findByRoomId(id);
    }
}
