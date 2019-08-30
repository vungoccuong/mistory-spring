package com.example.websocketdemo.dao;

import com.example.websocketdemo.model.UserModel;
import com.example.websocketdemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("UserService")
public class UserDao implements IDao<UserModel> {
    private final UserRepository repository;

    private List<UserModel> _users;

    public UserDao(UserRepository repository) {
        _users = new ArrayList<>();
        this.repository = repository;
    }

    @Override
    public List<UserModel> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<UserModel> get(String id) {
        return _users.stream().filter(user -> user.getId().equals(id)).findFirst();
    }

    public UserModel getByUserName(String username) {
        return repository.findOneByUsername(username);
    }

    @Override
    public void update(UserModel record) {
        int index = -1;
        for (UserModel user : _users) {
            index++;
            if (user.getId().equals(record.getId())) {
                _users.set(index, record);
                break;
            }
        }
    }

    @Override
    public void delete(UserModel record) {
    }

}
