package com.dear.authservice.domain.oauth.controller;

import com.dear.authservice.domain.auth.dto.res.SignInResDto;
import com.dear.authservice.domain.oauth.dto.req.OauthReqDto;
import com.dear.authservice.domain.oauth.service.OauthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/oauth-login")
@RequiredArgsConstructor
public class OauthController {

    private final OauthService oauthService;

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping("/{registrationId}")
    // @RequestParam, @Pathvariable 둘 다 (name = "") 선언을 안해주니까 에러남
    public ResponseEntity<SignInResDto> socialLogin(@RequestParam(name = "code") String code, @PathVariable(name = "registrationId") String registrationId) {
        log.info("code = {}", code);
        log.info("registrationId = {}", registrationId);
        SignInResDto signInResDto = oauthService.socialLogin(code, registrationId);
        log.info("accessToken = {}", signInResDto.getAccessToken());

        return ResponseEntity.ok().body(signInResDto);
    }
}
