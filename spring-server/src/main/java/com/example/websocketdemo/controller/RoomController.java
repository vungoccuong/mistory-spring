package com.example.websocketdemo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
public class RoomController {
    public RoomController() {
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Authentication authentication) {
        return authentication.getName();
    }

    @RequestMapping(value = "/info/{id}", method = RequestMethod.GET)
    public void getInfo(@PathVariable("id") long id) {

    }
    @RequestMapping(value = "/search", method =  RequestMethod.GET)
    public void getSearch(@RequestParam("text") String text) {

    }
}
