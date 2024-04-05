package com.dear.userservice.domain.kafka.consumer;

import com.dear.userservice.domain.kafka.dto.req.KafkaStampDealReqDto;
import com.dear.userservice.domain.notification.dto.req.MessageReqDto;
import com.dear.userservice.domain.notification.service.NotificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaNotificationConsumer {

    private final ObjectMapper objectMapper;
    private final NotificationService notificationService;

    @KafkaListener(topics = "stamp-notification", groupId = "user-group")
    public void listenStampDealReq(String message) {
        try {
            MessageReqDto messageReqDto = objectMapper.readValue(message, MessageReqDto.class);
            notificationService.sendNotification(messageReqDto);
        } catch(Exception e) {
            log.error("error = {}", e);
        }
    }
}
