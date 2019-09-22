package com.ltm2019.mistory.filter;

import com.ltm2019.mistory.entities.AccountCredentials;
import com.ltm2019.mistory.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {

    public JwtLoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest,
                                                HttpServletResponse httpServletResponse)
            throws AuthenticationException {
        String username = httpServletRequest.getParameter("username");
        String password = httpServletRequest.getParameter("password");
        AccountCredentials accountCredentials = new AccountCredentials(username, password);
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(accountCredentials.getUsername(),
                        accountCredentials.getPassword(), Collections.emptyList()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) throws IOException {
        AuthService.addAuthentication(response, authResult.getName());
        response.setCharacterEncoding("UTF-8");
        response.setHeader("content-type", "application/json; charset=utf-8");
        response.getWriter().write(String
                .format("{ \"username\": \"%s\", \"fullName\": \"%s\", \"avatar\": \"%s\", \"jwt\": \"%s\"  }", authResult.getName(),
                        authResult.getName(), authResult.getName(), response.getHeader("sid").toString()));
    }
}
