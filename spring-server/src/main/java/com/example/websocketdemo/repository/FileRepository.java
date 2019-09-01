package com.example.websocketdemo.repository;

import com.example.websocketdemo.model.FileModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<FileModel, String> {
}
