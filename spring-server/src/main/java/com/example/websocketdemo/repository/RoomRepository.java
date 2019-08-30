package com.example.websocketdemo.repository;

import com.example.websocketdemo.model.RoomModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RoomRepository extends MongoRepository<RoomModel, String> {
    @Query("{ members: ?0 }")
    List<RoomModel> getAllMemberRooms(ObjectId id);
}
