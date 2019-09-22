package com.ltm2019.mistory.repository;

import com.ltm2019.mistory.model.MessageModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MessageRepository extends MongoRepository<MessageModel, String> {
    @Query("{ room: ?0 }")
    List<MessageModel> findByRoomId(ObjectId id);
}
