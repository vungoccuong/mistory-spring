package com.example.websocketdemo.controller;

import com.example.websocketdemo.dao.UserDao;
import com.example.websocketdemo.entities.RegisterBody;
import com.example.websocketdemo.entities.RegisterResponse;
import com.example.websocketdemo.entities.UserResponse;
import com.example.websocketdemo.exceptions.UserExistException;
import com.example.websocketdemo.model.UserModel;
import com.example.websocketdemo.service.AuthService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserDao userDao;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @PostMapping("/logon")
    @ResponseBody
    public Responsible register(@Valid @ModelAttribute RegisterBody registerBody) throws UserExistException {
        UserModel userModel = userDao.getByUserName(registerBody.getUsername());
        if (userModel != null) {
            throw new UserExistException();
        }
        String hashPassword = AuthService.hashPassword(registerBody.getPassword());
        userModel = userDao.create(registerBody.getUsername(), registerBody.getFullName(), hashPassword);
        return new RegisterResponse();
    }

    @GetMapping("/search")
    @ResponseBody
    public List<Responsible> search(@RequestParam String text) {
        List<UserModel> userModelList = this.userDao.searchBy(text, 3);
        return userModelList.stream().map(UserResponse::fromModel).collect(Collectors.toList());
    }
}
