package com.dear.authservice.domain.oauth.service;

import com.dear.authservice.domain.auth.dto.req.SignInReqDto;
import com.dear.authservice.domain.auth.dto.req.SignUpReqDto;
import com.dear.authservice.domain.auth.dto.res.SignInResDto;
import com.dear.authservice.domain.auth.service.AuthService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;


@Slf4j
@RequiredArgsConstructor
@Service
public class OauthService {
    private final Environment env;
    private final AuthService authService;

    private final RestTemplate restTemplate = new RestTemplate();

    public SignInResDto socialLogin(String code, String registrationId) {
        String accessToken = getAccessToken(code, registrationId);
        JsonNode userResourceNode = getUserResource(accessToken, registrationId);
        log.info("userResourceNode = {}", userResourceNode);

        String id = "";
        String email = "";
        String name = "";
        String profile = "";
        if(registrationId.equals("google")) {
            id = userResourceNode.get("id").asText();
            email = userResourceNode.get("email").asText();
            name = userResourceNode.get("name").asText();
            profile = userResourceNode.get("picture").asText();
        } else if(registrationId.equals("naver")) {
            id = userResourceNode.get("response").get("id").asText();
            email = userResourceNode.get("response").get("email").asText();
            name = userResourceNode.get("response").get("name").asText();
            profile = userResourceNode.get("response").get("profile_image").asText();
        } else if(registrationId.equals("kakao")){
            id = userResourceNode.get("id").asText();
            email = userResourceNode.get("kakao_account").get("email").asText();
            name = userResourceNode.get("properties").get("nickname").asText();
            profile = userResourceNode.get("properties").get("profile_image").asText();
        }
        log.info("id = {}", id);
        log.info("email = {}", email);
        log.info("name = {}", name);
        log.info("profile = {}", profile);


        if(!authService.isExistUser(email, registrationId)) {
            authService.signUp(SignUpReqDto.builder()
                    .email(email)
                    .domain(registrationId)
                    .build());
        }

        return authService.signIn(SignInReqDto.builder()
                .email(email)
                .domain(registrationId)
                .build());
    }

    /*
     * 응답받은 Authorization Code를 이용하여 OAuth access token을 발급받는 메소드
     * RestTemplate을 이용하여 토큰 요청
     * */
    private String getAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("oauth." + registrationId + ".client-id");
        String clientSecret = "";
        String tokenUri = env.getProperty("oauth." + registrationId + ".token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        if(registrationId.equals("google")) {
            clientSecret = env.getProperty("oauth." + registrationId + ".client-secret");
            params.add("client_secret", clientSecret);
            String redirectUri = env.getProperty("oauth." + registrationId + ".redirect-uri");
            params.add("redirect_uri", redirectUri);
        } else if(registrationId.equals("naver")) {
            clientSecret = env.getProperty("oauth." + registrationId + ".client-secret");
            params.add("client_secret", clientSecret);
            String state = env.getProperty("oauth." + registrationId + ".state");
            params.add("state", state);
        } else if(registrationId.equals("kakao")) {
            String redirectUri = env.getProperty("oauth." + registrationId + ".redirect-uri");
            params.add("redirect_uri", redirectUri);
        }
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        log.info("response = {}", accessTokenNode);
        return accessTokenNode.get("access_token").asText();
    }

    private JsonNode getUserResource(String accessToken, String registrationId) {
        String resourceUri = env.getProperty("oauth."+registrationId+".resource-uri");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);

        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }

}

