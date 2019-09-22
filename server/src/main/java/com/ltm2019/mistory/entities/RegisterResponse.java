package com.ltm2019.mistory.entities;

import com.ltm2019.mistory.controller.Responsible;

public class RegisterResponse implements Responsible {
    private String message = "Đăng kí thành công";

    public String getMessage() {
        return message;
    }
}
