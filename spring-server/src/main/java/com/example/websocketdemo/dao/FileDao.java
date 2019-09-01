package com.example.websocketdemo.dao;

import com.example.websocketdemo.model.FileModel;
import com.example.websocketdemo.repository.FileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("FileService")
public class FileDao implements IDao<FileModel> {
    private final FileRepository fileRepository;

    public FileDao(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public List<FileModel> getAll() {
        return null;
    }

    @Override
    public Optional<FileModel> get(String id) {
        return fileRepository.findById(id);
    }

    @Override
    public void update(FileModel record) {

    }

    @Override
    public void delete(FileModel record) {

    }




    public FileModel insert(FileModel fileModel) {
        return fileRepository.insert(fileModel);
    }
}
