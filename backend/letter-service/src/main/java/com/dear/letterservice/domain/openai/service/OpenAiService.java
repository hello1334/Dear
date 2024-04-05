package com.dear.letterservice.domain.openai.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenAiService {
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper;

    @Value("${openai.api-key}")
    private String apiKey;

    public String generateLetter(String prompt) {

        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        int maxTokens = 500;
        double temperature = 0;


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode messagesNode = objectMapper.createObjectNode();
        messagesNode.put("role", "system").put("content", "너는 주어진 키워드를 바탕으로 편지 내용을 생성해주는 AI언어 모델이야. 내용의 길이가 400자 정도로 만들어야돼");
        ArrayNode messagesArray = objectMapper.createArrayNode().add(messagesNode);
        messagesNode = objectMapper.createObjectNode();
        messagesNode.put("role", "user").put("content", prompt);
        messagesArray.add(messagesNode);

        ObjectNode requestBodyNode = objectMapper.createObjectNode();
        requestBodyNode.put("model", "gpt-3.5-turbo-0125");
        requestBodyNode.set("messages", messagesArray);
        requestBodyNode.put("max_tokens", maxTokens);
        requestBodyNode.put("n", 1);
        requestBodyNode.put("temperature", temperature);

        try {
            String requestBody = objectMapper.writeValueAsString(requestBodyNode);

            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            if (responseEntity.getStatusCode().is2xxSuccessful()) {
                try {
                    JsonNode responseNode = objectMapper.readTree(responseEntity.getBody());
                    return responseNode.get("choices").get(0).get("message").get("content").asText();
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                    return null;
                }
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();  // Handle or log the exception as needed
            return null;
        }
    }
}
