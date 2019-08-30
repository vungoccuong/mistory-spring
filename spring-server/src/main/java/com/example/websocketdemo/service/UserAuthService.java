package com.example.websocketdemo.service;

import com.example.websocketdemo.dao.UserDao;
import com.example.websocketdemo.model.UserModel;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
public class UserAuthService implements UserDetailsService {
    private UserDao userDao;

    public UserAuthService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        UserModel user = userDao.getByUserName(s);
        if (user == null) {
            throw new UsernameNotFoundException(s);
        }
        System.out.println("user is found");
        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                System.out.println("user role");
                return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
            }

            @Override
            public String getPassword() {
                return user.getHashPassword();
            }

            @Override
            public String getUsername() {
                System.out.println("user username");
                return user.getUsername();
            }

            @Override
            public boolean isAccountNonExpired() {
                System.out.println("user account expire ");
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                System.out.println("user locked");
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                System.out.println("user non expire");
                return true;
            }

            @Override
            public boolean isEnabled() {
                System.out.println("user enabled");
                return true;
            }
        };
    }
}
