package com.dear.apigatewayservice.auth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${jwt.secret-key}")
    private String secretKey;

    public static enum Status
    {
        VALID, EXPIRED, INVALID
    }

    // accessToken validate
    public Status isValidAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return Status.VALID;
        } catch (ExpiredJwtException expiredJwtException) {
            return Status.EXPIRED;
        } catch (Exception e) {
            return Status.INVALID;
        }
    }

    // extract userName from expired accessToken
    public static String extractUserInfoFromExpiredToken (String token) {
        String[] arr = token.split("\\.");
        byte[] decodedBytes = Base64.getDecoder().decode(arr[1]);



        JSONParser parser = new JSONParser();
        JSONObject payload = null;
        try {
            payload = (JSONObject) parser.parse(new String(decodedBytes));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        String userEmail = (String) payload.get("sub");
        String userDomain = (String) payload.get("domain");
        String userId = (String) payload.get("userId");

        return userEmail + ":" + userDomain + ":" + userId;
    }
}