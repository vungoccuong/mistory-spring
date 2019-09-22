package com.ltm2019.mistory.repository;

import com.ltm2019.mistory.model.RoomModel;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RoomRepository extends MongoRepository<RoomModel, String> {
    @Query("{ members: ?0 }")
    List<RoomModel> getAllMemberRooms(ObjectId id);

    @Query("{ _id: ?0 , members: ?1 }")
    RoomModel findByIdAndUserId(ObjectId id, ObjectId userId);
    @Query("{ $and: [ { $or: [ { members: [?0, ?1] }, { members: [?1, ?0] } ] }, { members: { $size: 2 } },{ type: 'inbox' } ] }")
    RoomModel findRoomWithMembers(ObjectId one, ObjectId two);
    @Query("{ $and: [ { members: { $all: [?0] } }, { members: { $size: 1 } }, { type: 'group' } ] }")
    RoomModel findExistGroup(ObjectId id);
    @Query("{ $and: [ { members: ?1 }, { _id: ?0 }, { type: 'group' } ] }")
    RoomModel findGroupWithMember(ObjectId roomId, ObjectId memberId);
}
