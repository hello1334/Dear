package com.dear.letterservice.domain.kafka.producer;

import com.dear.letterservice.domain.kafka.dto.req.KafkaStampBuyReqDto;
import com.dear.letterservice.domain.kafka.dto.req.KafkaStampDealReqDto;
import com.dear.letterservice.domain.kafka.dto.res.KafkaLetterResDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaUserProducer {

    private final KafkaProducer kafkaProducer;

    @Autowired
    private ObjectMapper objectMapper;

    public void sendLetterInfoRes(KafkaLetterResDto kafkaLetterResDto) {
        try {
            kafkaProducer.sendMessage("letter-info-res", objectMapper.writeValueAsString(kafkaLetterResDto));
        } catch (Exception e) {
            log.error("KafkaLetterProducer.sendLetterInfoReq() error", e);
        }
    }

    public void sendStampDealReq(KafkaStampDealReqDto kafkaStampDealReqDto) {
        try {
            log.info("userId: {}, point: {}", kafkaStampDealReqDto.getUserId(), kafkaStampDealReqDto.getPoint());
            kafkaProducer.sendMessage("stamp-deal-req", objectMapper.writeValueAsString(kafkaStampDealReqDto));
        } catch (Exception e) {
            log.error("KafkaUserProducer.sendStampDealReq() error", e);
        }
    }

    public void sendStampBuyReq(KafkaStampBuyReqDto kafkaStampBuyReqDto) {
        try {
            log.info("userId: {}, point: {}", kafkaStampBuyReqDto.getUserId(), kafkaStampBuyReqDto.getUserPoint());
            kafkaProducer.sendMessage("stamp-buy-req", objectMapper.writeValueAsString(kafkaStampBuyReqDto));
        } catch (Exception e) {
            log.error("KafkaUserProducer.sendStampBuyReq() error", e);
        }
    }
}
