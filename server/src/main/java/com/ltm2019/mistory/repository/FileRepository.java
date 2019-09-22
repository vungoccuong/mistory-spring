package com.ltm2019.mistory.repository;

import com.ltm2019.mistory.model.FileModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FileRepository extends MongoRepository<FileModel, String> {
}
