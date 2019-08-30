package com.example.websocketdemo.dao;

import com.example.websocketdemo.model.RoomModel;
import com.example.websocketdemo.repository.RoomRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("RoomService")
public class RoomDao implements IDao<RoomModel> {
    private final RoomRepository roomRepository;

    public RoomDao(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<RoomModel> getAll() {
        return null;
    }

    @Override
    public Optional<RoomModel> get(String id) {
        return roomRepository.findById(id);
    }

    @Override
    public void update(RoomModel record) {
        roomRepository.save(record);
    }

    @Override
    public void delete(RoomModel record) {

    }

    public List<RoomModel> getAllMemberRooms(ObjectId id) {
        return roomRepository.getAllMemberRooms(id);
    }
}
