package com.example.websocketdemo.utils;

import com.example.websocketdemo.dao.UserDao;
import com.example.websocketdemo.model.UserModel;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.util.Collections;

@Service("AuthService")
public class AuthService {
    private static final String Secret_key = "12345555555555551234555555555555555555";


    private static String createJwt(String id) throws UnsupportedEncodingException {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Key signingKey = new SecretKeySpec(Secret_key.getBytes("UTF-8"), signatureAlgorithm.getJcaName());
        JwtBuilder builder = Jwts.builder().setId(id).setIssuer("hirosume").signWith(signatureAlgorithm, signingKey);
        return builder.compact();
    }

    private static Claims decodeJWT(String jwt) throws UnsupportedEncodingException {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Key signingKey = new SecretKeySpec(Secret_key.getBytes("UTF-8"), signatureAlgorithm.getJcaName());
        //This line will throw an exception if it is not a signed JWS (as expected)
        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(jwt).getBody();
    }

    public static String createJwtFromUsername(String username) throws UnsupportedEncodingException {
        return createJwt(username);
    }

    public static String getUsernameFromJwt(String jwt) throws UnsupportedEncodingException {
        Claims data = decodeJWT(jwt);
        return data.getId();
    }

    public static void addAuthentication(HttpServletResponse res, String username) throws UnsupportedEncodingException {
        String JWT = createJwtFromUsername(username);
        res.addCookie(new Cookie("sid", JWT));
    }

    public static Authentication getAuthentication(HttpServletRequest request, UserDao userDao) {
        String token = CommonUtil.getCookieValue(request, "sid");
        try {
            if (token == null) return null;
            String username = getUsernameFromJwt(token);
            UserModel userModel = userDao.getByUserName(username);
            return username != null ? new UsernamePasswordAuthenticationToken(username, userModel,
                    Collections.emptyList()) : null;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }

}
