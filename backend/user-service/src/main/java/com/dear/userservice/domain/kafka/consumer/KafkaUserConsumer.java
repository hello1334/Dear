package com.dear.userservice.domain.kafka.consumer;

import com.dear.userservice.domain.kafka.dto.req.KafkaStampBuyReqDto;
import com.dear.userservice.domain.kafka.dto.req.KafkaStampDealReqDto;
import com.dear.userservice.domain.kafka.producer.KafkaLetterProducer;
import com.dear.userservice.domain.point.service.PointService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaUserConsumer {
    private final KafkaLetterProducer kafkaLetterProducer;
    private final PointService pointService;
    private volatile KafkaStampDealReqDto kafkaStampDealReqDto;
    private volatile KafkaStampBuyReqDto kafkaStampBuyReqDto;
    @Autowired
    private ObjectMapper objectMapper;

    @KafkaListener(topics = "stamp-deal-req", groupId = "user-group")
    public void listenStampDealReq(String message) {
        try {
            kafkaStampDealReqDto = objectMapper.readValue(message, KafkaStampDealReqDto.class);
            pointService.addPointHistory(kafkaStampDealReqDto.getUserId(), kafkaStampDealReqDto.getPoint(), kafkaStampDealReqDto.getContent());
        } catch(Exception e) {
            kafkaLetterProducer.sendStampDealRollback(kafkaStampDealReqDto.getStampDealId());
        }
    }

    @KafkaListener(topics = "stamp-buy-req", groupId = "user-group")
    public void listenStampBuyReq(String message) {
        try {
            kafkaStampBuyReqDto = objectMapper.readValue(message, KafkaStampBuyReqDto.class);
            pointService.addPointHistory(kafkaStampBuyReqDto);
        } catch(Exception e) {
            kafkaLetterProducer.sendStampBuyRollback(kafkaStampBuyReqDto.getStampBuyId());
        }
    }
}
