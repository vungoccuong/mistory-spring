package com.company;

public class LoginController {
    private LoginModel user;
    public LoginController() {

    }

    public LoginController(LoginModel user) {
        this.user = user;
    }
    public LoginModel checkLogin(String username, String password) {
        if(username.equals("admin") && password.equals("123")) {
            user = new LoginModel(username, password);
        }
        return user;
    }
}
