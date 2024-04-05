package com.dear.userservice.domain.kafka.producer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaLetterProducer {

    private final KafkaProducer kafkaProducer;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendLetterInfoReq(UUID userId) {
        try {
            log.info("userId: {}", userId);
            kafkaProducer.sendMessage("letter-info-req", objectMapper.writeValueAsString(userId));
        } catch (Exception e) {
            log.error("KafkaLetterProducer.sendLetterInfoReq() error", e);
        }
    }

    public void sendStampDealRollback(Long stampDealId) {
        try {
            log.info("stampDealId: {}", stampDealId);
            kafkaProducer.sendMessage("stamp-deal-rollback", String.valueOf(stampDealId));
        } catch (Exception e) {
            log.error("KafkaLetterProducer.sendStampDealRollback() error", e);
        }
    }

    public void sendStampBuyRollback(Long stampBuyId) {
        try {
            log.info("stampBuyId: {}", stampBuyId);
            kafkaProducer.sendMessage("stamp-buy-rollback", String.valueOf(stampBuyId));
        } catch (Exception e) {
            log.error("KafkaLetterProducer.sendStampBuyRollback() error", e);
        }
    }
}
