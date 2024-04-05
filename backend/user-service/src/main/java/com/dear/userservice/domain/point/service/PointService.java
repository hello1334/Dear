package com.dear.userservice.domain.point.service;

import com.dear.userservice.domain.kafka.dto.req.KafkaStampBuyReqDto;
import com.dear.userservice.domain.kafka.dto.req.KafkaStampDealReqDto;
import com.dear.userservice.domain.point.dto.res.PointHistoryResDto;
import com.dear.userservice.domain.point.exception.PointException;
import com.dear.userservice.domain.point.repository.PointHistoryRepository;
import com.dear.userservice.domain.point.repository.entity.PointHistory;
import com.dear.userservice.domain.user.exception.UserException;
import com.dear.userservice.domain.user.repository.UserRepository;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.global.dto.ResponseCode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class PointService {

    private final PointHistoryRepository pointHistoryRepository;
    private final UserRepository userRepository;

    @Transactional
    public PointHistory testPlusInput(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(ResponseCode.USER_NOT_FOUND));

        PointHistory pointHistory = PointHistory.builder()
                .content("테스트 포인트")
                .point(50)
                .totalPoint(100)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        return pointHistoryRepository.save(pointHistory);
    }

    @Transactional
    public PointHistory testMinusInput(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(ResponseCode.USER_NOT_FOUND));

        PointHistory pointHistory = PointHistory.builder()
                .content("테스트 포인트")
                .point(-50)
                .totalPoint(100)
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        return pointHistoryRepository.save(pointHistory);
    }

    public List<PointHistoryResDto> getPointHistories(UUID userId) {
        List<PointHistoryResDto> histories = new java.util.ArrayList<>(pointHistoryRepository.findByUserId(userId).stream()
                .map(history -> PointHistoryResDto.builder()
                        .id(history.getId())
                        .content(history.getContent())
                        .point(history.getPoint())
                        .totalPoint(history.getTotalPoint())
                        .createdAt(history.getCreatedAt())
                        .build())
                .toList());
        Collections.reverse(histories);
        return histories;
    }

    @Transactional
    public void addPointHistory(UUID userId, Integer point, String content) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException(ResponseCode.USER_NOT_FOUND));
        Integer totalPoint = user.getPoint() + point;
        if(totalPoint < 0) {
            throw new PointException(ResponseCode.NO_POINT);
        }
        PointHistory pointHistory = PointHistory.builder()
                .point(point)
                .totalPoint(totalPoint)
                .content(content)
                .user(user)
                .createdAt(LocalDateTime.now()).build();
        pointHistoryRepository.save(pointHistory);
        user.setPoint(totalPoint);
    }

    @Transactional
    public void addPointHistory(KafkaStampBuyReqDto kafkaStampBuyReqDto) {
        addPointHistory(kafkaStampBuyReqDto.getUserId(), kafkaStampBuyReqDto.getUserPoint(), kafkaStampBuyReqDto.getUserContent());
        addPointHistory(kafkaStampBuyReqDto.getSellerId(), kafkaStampBuyReqDto.getSellerPoint(), kafkaStampBuyReqDto.getSellerContent());
    }


}
