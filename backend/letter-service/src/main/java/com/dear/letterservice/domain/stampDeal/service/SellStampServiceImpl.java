package com.dear.letterservice.domain.stampDeal.service;

import com.dear.letterservice.domain.kafka.dto.req.KafkaStampDealReqDto;
import com.dear.letterservice.domain.kafka.producer.KafkaUserProducer;
import com.dear.letterservice.domain.stamp.entity.Stamp;
import com.dear.letterservice.domain.stamp.exception.StampException;
import com.dear.letterservice.domain.stamp.repository.StampRepository;
import com.dear.letterservice.domain.stampDeal.dto.AddSellStampRequest;
import com.dear.letterservice.domain.stampDeal.dto.GetAvailableSellStampResponse;
import com.dear.letterservice.domain.stampDeal.dto.GetSellStampResponse;
import com.dear.letterservice.domain.stampDeal.dto.GetSellStampsListResponse;
import com.dear.letterservice.domain.stampDeal.entity.StampDeal;
import com.dear.letterservice.domain.stampDeal.repository.StampDealRepository;
import com.dear.letterservice.global.dto.ResponseCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
@Service
@RequiredArgsConstructor
public class SellStampServiceImpl implements SellStampService {

    private final StampDealRepository stampDealRepository;
    private final StampRepository stampRepository;
    private final KafkaUserProducer kafkaUserProducer;
    @Override
    public GetSellStampsListResponse getSellStampsList(int page, int size, String sort, String keyword) {
        List<GetSellStampResponse> getSellStampsResponse = new ArrayList<>();
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(sort.equals("price") ? Sort.Direction.ASC : Sort.Direction.DESC, sort));
        Page<StampDeal> stampDealList = stampDealRepository.findAllByTitleContainingOrDescriptionContaining(pageable, keyword, keyword);
        for (StampDeal stampDeal: stampDealList.toList()) {
            GetSellStampResponse getSellStampResponse = GetSellStampResponse.getSellStampResponse(stampDeal.getId(), stampDeal.getStamp().getImage().getUrl(), stampDeal.getTitle(), stampDeal.getDescription(), stampDeal.getPrice());
            getSellStampsResponse.add(getSellStampResponse);
        }
        return GetSellStampsListResponse.getSellStampResponse(stampDealList.getTotalPages(), stampDealList.getTotalElements(), getSellStampsResponse);
    }

    @Override
    public List<GetAvailableSellStampResponse> getAvailableSellStampList(UUID userId) {
        return stampDealRepository.findStampDealByUserId(userId);
    }

    @Override
    @Transactional
    public void addSellStamp(UUID userId, AddSellStampRequest addSellStampRequest) {
        Stamp stamp = stampRepository.findById(addSellStampRequest.getStampId()).orElseThrow(() -> new StampException(ResponseCode.STAMP_NOT_FOUND));
        StampDeal stampDeal = StampDeal.builder()
                .stamp(stamp)
                .title(addSellStampRequest.getTitle())
                .description(addSellStampRequest.getContent())
                .price(addSellStampRequest.getPrice())
                .purchaseAmount(0L)
                .registerAt(LocalDateTime.now()).build();
        stampDeal = stampDealRepository.save(stampDeal);
//        // 포인트 차감
//        Integer subPoint = Math.toIntExact(-Math.round(addSellStampRequest.getPrice() * 0.3));
//        KafkaStampDealReqDto kafkaStampDealReqDto = KafkaStampDealReqDto.builder().userId(userId).stampDealId(stampDeal.getId()).point(subPoint).content("우표 판매 등록 차감").build();
//        kafkaUserProducer.sendStampDealReq(kafkaStampDealReqDto);
    }

    @Override
    public void delete(Long stampDealId) {
        stampDealRepository.deleteById(stampDealId);
    }

}
