package com.ltm2019.mistory.controller;

import com.ltm2019.mistory.exceptions.UnAuthException;
import com.ltm2019.mistory.utils.IUserManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    private final IUserManager userManager;

    public WebSocketEventListener(IUserManager userManager) {
        this.userManager = userManager;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) throws Exception {
        if (event.getUser() == null) {
            throw new UnAuthException();
        }
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        userManager.set(event.getUser().getName(), headerAccessor.getSessionId());
        logger.info(event.getUser().getName());
        logger.info("Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal user = headerAccessor.getUser();
        if (user != null) {
            logger.info("User Disconnected : " + user.getName());
            userManager.remove(user.getName(), headerAccessor.getSessionId());
        }
    }
}
