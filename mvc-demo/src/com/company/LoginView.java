package com.company;

import java.util.Scanner;

public class LoginView {
    private LoginModel user;
    private static int retry = 3;
    LoginView() {
        displayFormLogin();
    }
    public LoginView(LoginModel user) {
        displayFormDetail(user);
    }
    private void displayFormLogin() {
        String strUser, strPass;
        System.out.println("--- Login Form ---");
        Scanner input  = new Scanner(System.in);
        System.out.println("User: ");
        strUser = input.nextLine();
        System.out.println("Pass: ");
        strPass = input.nextLine();
        user = new LoginController().checkLogin(strUser, strPass);
        if(user!= null) {
            displayFormDetail(user);
        } else {
            System.out.println("wrong username or password" + retry--);
            if(retry > 0) {
               displayFormLogin();
            }
            System.exit(retry);
        }
    }
    private void displayFormDetail(LoginModel model) {
        System.out.println(" -- Details Form -- ");
        System.out.println("user: " + model.getUserName());
    }
}
