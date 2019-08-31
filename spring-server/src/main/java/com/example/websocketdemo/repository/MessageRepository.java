package com.example.websocketdemo.repository;

import com.example.websocketdemo.model.MessageModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MessageRepository extends MongoRepository<MessageModel, String> {
    @Query("{ room: ?0 }")
    List<MessageModel> findByRoomId(ObjectId id);
}
