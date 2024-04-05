package com.dear.letterservice.global.util;

import java.util.Base64;
import java.util.UUID;

import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import com.dear.letterservice.global.dto.ResponseCode;
import com.dear.letterservice.global.exception.BaseException;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONObject;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtUtil {
	public UUID extractUserId (HttpServletRequest request) {
		String authorization = request.getHeader("Authorization");
		if (authorization == null) {
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
