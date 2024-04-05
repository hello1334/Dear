package com.dear.authservice.domain.auth.controller;

import com.dear.authservice.domain.auth.dto.res.TokenReIssueResDto;
import com.dear.authservice.domain.auth.util.JwtUtil;
import com.dear.authservice.global.dto.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/tokens")
@RequiredArgsConstructor
public class AuthController {

    private final JwtUtil jwtUtil;

    @GetMapping("/reissue")
    public ResponseEntity<TokenReIssueResDto> reIssueAccessToken(HttpServletRequest request) {
        return ResponseEntity.ok().body(jwtUtil.reIssueAccessToken(request));
    }
}
