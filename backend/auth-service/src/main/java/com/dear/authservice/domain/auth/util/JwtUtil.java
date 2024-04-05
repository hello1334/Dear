package com.dear.authservice.domain.auth.util;

import com.dear.authservice.domain.auth.dto.res.TokenReIssueResDto;
import com.dear.authservice.domain.user.repository.UserRepository;
import com.dear.authservice.domain.user.repository.entity.User;
import com.dear.authservice.domain.user.service.UserDetailServiceImpl;
import com.dear.authservice.domain.user.service.UserDetailServiceImpl.CustomUserDetails;
import com.dear.authservice.global.dto.ResponseCode;
import com.dear.authservice.global.exception.BaseException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperty jwtProperty;
    private final UserDetailServiceImpl userDetailService;
    private final StringRedisTemplate redisTemplate;
    private final UserRepository userRepository;

    // accessToken 생성
    public String createAccessToken(Authentication authentication, User user) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("domain", user.getDomain());
        claims.put("userId", String.valueOf(user.getId()));

        Date now = new Date();
        Date expireDate = new Date(now.getTime() + jwtProperty.getAccessExpirationTime() * 1000);
        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, jwtProperty.getSecretKey())
                .compact();
        log.info("JWT accessToken = {}", accessToken);
        return accessToken;
    }

    // refreshToken 생성
    @Transactional
    public void createRefreshToken(Authentication authentication, User user) {
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        claims.put("domain", user.getDomain());
        claims.put("userId", String.valueOf(user.getId()));
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + jwtProperty.getRefreshExpirationTime() * 1000);
        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, jwtProperty.getSecretKey())
                .compact();

        log.info("refreshToken = {}", refreshToken);
        redisTemplate.opsForValue().set(user.getEmail()+":"+user.getDomain()+":"+String.valueOf(user.getId()), refreshToken, Duration.ofSeconds(jwtProperty.getRefreshExpirationTime()));
    }

    public Authentication getAuthentication(String token) {
        String email = Jwts
                .parser()
                .setSigningKey(jwtProperty.getSecretKey())
                .parseClaimsJws(token)
                .getBody()
                .getSubject();

        String domain = Jwts
                .parser()
                .setSigningKey(jwtProperty.getSecretKey())
                .parseClaimsJws(token)
                .getBody()
                .get("domain", String.class);

        String userId = Jwts
                .parser()
                .setSigningKey(jwtProperty.getSecretKey())
                .parseClaimsJws(token)
                .getBody()
                .get("userId", String.class);

        CustomUserDetails customUserDetails = (CustomUserDetails) userDetailService.loadUserByUsername(email+":"+domain+":"+userId);
        return new UsernamePasswordAuthenticationToken(customUserDetails, "", customUserDetails.getAuthorities());
    }

    // http 헤더로부터 bearer token을 추출
    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public TokenReIssueResDto reIssueAccessToken(HttpServletRequest request) {

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
        String userEmail = (String) payload.get("sub");
        String userDomain = (String) payload.get("domain");
        String userId = (String) payload.get("userId");

        String refreshToken = redisTemplate.opsForValue().get(userEmail+":"+userDomain+":"+userId);

        // Refresh Token 만료 된 상황
        if(refreshToken == null) {
            return null;
        }

        // Refresh Token 만료 안된 상황
        else {
            Authentication authentication = getAuthentication(refreshToken);

            User user = userRepository.findById(UUID.fromString(userId))
                    .orElseThrow(() -> new BaseException(ResponseCode.USER_NOT_FOUND));

            // accessToken 재발급
            return TokenReIssueResDto.builder()
                    .accessToken(createAccessToken(authentication, user))
                    .build();
        }
    }
}
