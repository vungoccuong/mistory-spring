package com.example.websocketdemo.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.Key;

public class Auth {
    private static final String Secret_key = "12345555555555551234555555555555555555";

    public static String createJwt(String id) throws UnsupportedEncodingException {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Key signingKey = new SecretKeySpec(Secret_key.getBytes("UTF-8"), signatureAlgorithm.getJcaName());
        JwtBuilder builder = Jwts.builder().setId(id).setIssuer("hirosume").signWith(signatureAlgorithm, signingKey);
        return builder.compact();
    }

    public static Claims decodeJWT(String jwt) throws UnsupportedEncodingException {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        Key signingKey = new SecretKeySpec(Secret_key.getBytes("UTF-8"), signatureAlgorithm.getJcaName());
        //This line will throw an exception if it is not a signed JWS (as expected)
        return Jwts.parser()
                .setSigningKey(signingKey)
                .parseClaimsJws(jwt).getBody();
    }
}
