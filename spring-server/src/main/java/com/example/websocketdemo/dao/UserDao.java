package com.example.websocketdemo.dao;

import com.example.websocketdemo.model.UserModel;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserDao implements IDao<UserModel> {
    //singleton
    private static UserDao _instance;

    public static UserDao getInstance() {
        if (_instance == null) {
            _instance = new UserDao();
        }
        return _instance;
    }


    private List<UserModel> _users;

    private UserDao() {
        _users = new ArrayList<>();
        _users.add(new UserModel(0, "hirosume"));
        _users.add(new UserModel(1, "hirosume1"));
    }

    @Override
    public List<UserModel> getAll() {
        return _users;
    }

    @Override
    public Optional<UserModel> get(int id) {
        return _users.stream().filter(user -> user.get_id() == id).findFirst();
    }
    public Optional<UserModel> get(String username) {
        return _users.stream().filter(user -> user.getName().equals(username)).findFirst();
    }

    @Override
    public void update(UserModel record) {
        int index = -1;
        for (UserModel user : _users) {
            index++;
            if (user.get_id() == record.get_id()) {
                _users.set(index, record);
                break;
            }
        }
    }

    @Override
    public void delete(UserModel record) {
        get(record.get_id()).ifPresent(user -> _users.remove(user));
    }
}
