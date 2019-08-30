package com.example.websocketdemo.dao;

import com.example.websocketdemo.model.MessageModel;
import com.example.websocketdemo.repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("MessageService")
public class MessageDao implements IDao<MessageModel> {
    private MessageRepository messageRepository;

    public MessageDao(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public List<MessageModel> getAll() {
        return null;
    }

    @Override
    public Optional<MessageModel> get(String id) {
        return Optional.empty();
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
}
