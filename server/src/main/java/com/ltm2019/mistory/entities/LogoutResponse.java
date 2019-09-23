package com.ltm2019.mistory.entities;

import com.ltm2019.mistory.controller.Responsible;

public class LogoutResponse implements Responsible {
    private String message = "Đăng xuất thành công";

    public String getMessage() {
        return message;
    }
}
