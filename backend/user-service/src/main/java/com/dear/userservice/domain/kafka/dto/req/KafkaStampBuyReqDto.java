package com.dear.userservice.domain.kafka.dto.req;

import lombok.Getter;

import java.util.UUID;

@Getter
public class KafkaStampBuyReqDto {
    private UUID userId;
    private UUID sellerId;
    private Long stampBuyId;
    private Integer userPoint;
    private Integer sellerPoint;
    private String userContent;
    private String sellerContent;
}
