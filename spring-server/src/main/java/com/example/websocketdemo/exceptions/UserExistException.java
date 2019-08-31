package com.example.websocketdemo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class UserExistException extends RuntimeException {

    public UserExistException() {
        super("Người dùng đã tồn tại");
    }
}
