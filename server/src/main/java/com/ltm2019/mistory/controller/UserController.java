package com.ltm2019.mistory.controller;

import com.ltm2019.mistory.dao.UserDao;
import com.ltm2019.mistory.entities.LogoutResponse;
import com.ltm2019.mistory.entities.RegisterBody;
import com.ltm2019.mistory.entities.RegisterResponse;
import com.ltm2019.mistory.entities.UserResponse;
import com.ltm2019.mistory.exceptions.UserExistException;
import com.ltm2019.mistory.model.UserModel;
import com.ltm2019.mistory.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
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

    @GetMapping("/current")
    @ResponseBody
    public UserResponse currentUser(Authentication authentication) {
        UserModel user = (UserModel) authentication.getCredentials();
        return UserResponse.fromModel(user);
    }

    @GetMapping("/logout")
    @ResponseBody
    public Responsible logout(HttpServletResponse response) {
        Cookie newCookie = new Cookie("sid", null);
        response.addCookie(newCookie);
        return new LogoutResponse();
    }
}
