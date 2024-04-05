package com.dear.letterservice.domain.letterMusic.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
@RequiredArgsConstructor
public class LetterMusicService {

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateMusic(String title) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Set request body
        String requestBody = "{\"title\": \"" + title + "\"}";

        // Create HttpEntity with headers and body
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        String output = restTemplate.exchange("http://70.12.247.56:8080/generate-music", HttpMethod.POST, entity, String.class).getBody();
        log.info("output = {}", output);
        return output;
    }
}
