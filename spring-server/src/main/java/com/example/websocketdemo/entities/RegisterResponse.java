package com.example.websocketdemo.entities;

import com.example.websocketdemo.controller.Responsible;

public class RegisterResponse implements Responsible {
    private String message = "Đăng kí thành công";

    public String getMessage() {
        return message;
    }
}
