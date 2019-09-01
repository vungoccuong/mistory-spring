package com.example.websocketdemo.entities;

import com.example.websocketdemo.controller.Responsible;

public class GroupRemoveResponse implements Responsible {
    private String status = "success";
    private String _id;

    public GroupRemoveResponse(String _id) {
        this._id = _id;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }
}
