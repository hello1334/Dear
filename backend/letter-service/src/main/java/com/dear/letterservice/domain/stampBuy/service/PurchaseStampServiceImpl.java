package com.dear.letterservice.domain.stampBuy.service;

import com.dear.letterservice.domain.kafka.dto.req.KafkaStampBuyReqDto;
import com.dear.letterservice.domain.kafka.producer.KafkaUserProducer;
import com.dear.letterservice.domain.stamp.dto.GetPurchaseStampsListResponse;
import com.dear.letterservice.domain.stamp.entity.Stamp;
import com.dear.letterservice.domain.stampBuy.entity.StampBuy;
import com.dear.letterservice.domain.stampBuy.exception.StampBuyException;
import com.dear.letterservice.domain.stampBuy.repository.StampBuyRepository;
import com.dear.letterservice.domain.stampDeal.entity.StampDeal;
import com.dear.letterservice.domain.stampDeal.exception.StampDealException;
import com.dear.letterservice.domain.stampDeal.repository.StampDealRepository;
import com.dear.letterservice.global.dto.ResponseCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PurchaseStampServiceImpl implements PurchaseStampService {
    private final StampBuyRepository stampBuyRepository;
    private final StampDealRepository stampDealRepository;
    private final KafkaUserProducer kafkaUserProducer;

    @Override
    @Transactional
    public void purchaseStamp(UUID userId, Long stampId) {
        StampDeal stampDeal = stampDealRepository.findById(stampId).orElseThrow(() -> new StampDealException(ResponseCode.STAMP_DEAL_NOT_FOUND));
        StampBuy stampBuy = StampBuy.builder()
                .userId(userId)
                .stampDeal(stampDeal)
                .buyAt(LocalDateTime.now()).build();
        // 우표 구매
        stampBuy = stampBuyRepository.save(stampBuy);
        // 판매량 1 증가
        stampDeal.setPurchaseAmount(stampDeal.getPurchaseAmount());
        stampDealRepository.save(stampDeal);
        // 구매자 포인트 차감 & 판매자 포인트 적립
        UUID sellerId = stampDeal.getStamp().getFromUserId();
        Integer addPoint = stampDeal.getPrice();
        KafkaStampBuyReqDto kafkaStampBuyReqDto = KafkaStampBuyReqDto.builder()
                .userId(userId)
                .sellerId(sellerId)
                .stampBuyId(stampBuy.getId())
                .userPoint(-stampDeal.getPrice())
                .sellerPoint(addPoint)
                .userContent("우표 구매 차감")
                .sellerContent("우표 판매 적립").build();

        kafkaUserProducer.sendStampBuyReq(kafkaStampBuyReqDto);
    }

    @Override
    @Transactional
    public void delete(Long stampBuyId) {
        StampBuy stampBuy = stampBuyRepository.findById(stampBuyId).orElseThrow(() -> new StampBuyException(ResponseCode.STAMP_BUY_NOT_FOUND));
        stampBuyRepository.deleteById(stampBuyId);
        StampDeal stampDeal = stampBuy.getStampDeal();
        stampDeal.setPurchaseAmount(stampBuy.getStampDeal().getPurchaseAmount() - 1);
        stampDealRepository.save(stampDeal);
    }

    @Override
    public Integer getCountByUserId(UUID userId) {
        return stampBuyRepository.countByUserId(userId);
    }

    @Override
    @Transactional
    public List<GetPurchaseStampsListResponse> getPurchaseStampsList(UUID userId) {
        List<GetPurchaseStampsListResponse> list = new ArrayList<>();
        List<StampBuy> stampBuyList = stampBuyRepository.findByUserId(userId);
        for (StampBuy stampBuy: stampBuyList) {
            Stamp stamp = stampBuy.getStampDeal().getStamp();
            Long stampId = stamp.getId();
            String image = stamp.getImage().getUrl();
            GetPurchaseStampsListResponse getPurchaseStampsListResponse = GetPurchaseStampsListResponse.getPurchaseStampsListResponse(stampId, image);
            list.add(getPurchaseStampsListResponse);
        }
        return list;
    }
}
