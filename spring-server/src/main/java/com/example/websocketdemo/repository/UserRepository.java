package com.example.websocketdemo.repository;

import com.example.websocketdemo.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<UserModel, String> {
    @Query("{ username:'?0'}")
    UserModel findOneByUsername(String username);
}
