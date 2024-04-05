package com.dear.letterservice.domain.kafka.consumer;

import com.dear.letterservice.domain.kafka.dto.res.KafkaLetterResDto;
import com.dear.letterservice.domain.kafka.producer.KafkaUserProducer;
import com.dear.letterservice.domain.stamp.service.StampService;
import com.dear.letterservice.domain.stampBuy.service.PurchaseStampService;
import com.dear.letterservice.domain.stampDeal.exception.StampDealException;
import com.dear.letterservice.domain.stampDeal.service.SellStampService;
import com.dear.letterservice.global.dto.ResponseCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaLetterConsumer {

    private final KafkaUserProducer kafkaUserProducer;
    private final SellStampService sellStampService;
    private final PurchaseStampService purchaseStampService;
    private final StampService stampService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "letter-info-req", groupId = "letter-group")
    public void listenLetterInfoReq(String message) {

        try {
            UUID userId = objectMapper.readValue(message, UUID.class);
            log.info("UUID: {}", userId);

            /*
             * Todo... stampCnt, sendCnt, recvCnt DB에서 조회하여 추가
             * */
            KafkaLetterResDto kafkaLetterResDto = KafkaLetterResDto.builder()
                    .stampCnt(purchaseStampService.getCountByUserId(userId))
                    .sendCnt(stampService.getCountByFromUserId(userId))
                    .recvCnt(stampService.getCountByToUserId(userId))
                    .build();

            kafkaUserProducer.sendLetterInfoRes(kafkaLetterResDto);
        } catch (IllegalArgumentException e) {
            log.info("Invalid UUID format: {}", message);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @KafkaListener(topics = "stamp-deal-rollback", groupId = "letter-group")
    public void listenStampDealRollback(Long stampDealId) {
        log.error("Stamp Deal Rollback error, stampDealId :{}", stampDealId);
        sellStampService.delete(stampDealId);
        throw new StampDealException(ResponseCode.NO_POINT);
    }

    @KafkaListener(topics = "stamp-buy-rollback", groupId = "letter-group")
    public void listenStampBuyRollback(Long stampBuyId) {
        log.error("Stamp Buy Rollback error, stampBuyId :{}", stampBuyId);
        purchaseStampService.delete(stampBuyId);
        throw new StampDealException(ResponseCode.NO_POINT);
    }
}
