package com.example.websocketdemo.model;

import javax.security.auth.Subject;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

public class UserModel implements Principal {


    private int _id;
    private String _username;
    private Set<String> _rooms;

    //construct
    public UserModel(int id ,String name) {
        _id = id;
        _username = name;
        _rooms = new HashSet<>();
    }

    //get and set
    @Override
    public String getName() {
        return this._username;
    }

    @Override
    public boolean implies(Subject subject) {
        return false;
    }

    public Set<String> rooms() {
        return _rooms;
    }

    public void addNewRoom(String room) {
        _rooms.add(room);
    }
    public int get_id() {
        return _id;
    }

    public void set_id(int _id) {
        this._id = _id;
    }

}
