package com.dear.userservice.global.util;

import com.dear.userservice.global.dto.ResponseCode;
import com.dear.userservice.global.exception.BaseException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtUtil {

    public UUID extractUserIdFromExpiredToken (HttpServletRequest request) {

        String authorization = request.getHeader("Authorization");
        if(authorization == null) {
            throw new BaseException(ResponseCode.NO_AUTHORIZATION_HEADER);
        }

        String token = authorization.replace("Bearer ", "");

        String[] arr = token.split("\\.");
        byte[] decodedBytes = Base64.getDecoder().decode(arr[1]);

        JSONParser parser = new JSONParser();
        JSONObject payload = null;
        try {
            payload = (JSONObject) parser.parse(new String(decodedBytes));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        String userId = (String) payload.get("userId");

        return UUID.fromString(userId);
    }


}
