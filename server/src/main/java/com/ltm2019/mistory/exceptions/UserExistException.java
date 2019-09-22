package com.ltm2019.mistory.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class UserExistException extends RuntimeException {

    public UserExistException() {
        super("Người dùng đã tồn tại");
    }
}
