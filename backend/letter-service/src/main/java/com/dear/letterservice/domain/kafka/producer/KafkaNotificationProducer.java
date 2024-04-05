package com.dear.letterservice.domain.kafka.producer;

import com.dear.letterservice.domain.kafka.dto.res.KafkaLetterNotificationDto;
import com.dear.letterservice.domain.kafka.dto.res.KafkaLetterResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaNotificationProducer {

    private final KafkaProducer kafkaProducer;
    private final ObjectMapper objectMapper;

    public void sendLetterNotification(KafkaLetterNotificationDto kafkaLetterNotificationDto) {
        try {
            kafkaProducer.sendMessage("stamp-notification", objectMapper.writeValueAsString(kafkaLetterNotificationDto));
        } catch (Exception e) {
            log.error("KafkaLetterProducer.sendLetterNotification() error", e);
        }
    }
}
