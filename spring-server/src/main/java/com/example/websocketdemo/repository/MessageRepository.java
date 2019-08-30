package com.example.websocketdemo.repository;

import com.example.websocketdemo.model.MessageModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<MessageModel, String> {
}
