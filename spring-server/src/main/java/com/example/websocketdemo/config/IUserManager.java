package com.example.websocketdemo.config;

import java.util.Set;

public interface IUserManager {
    void set(String username, String sessionId);
    Set<String> get(String username);
    void remove(String username ,String sessionId);
    boolean isOnline(String username);
}
