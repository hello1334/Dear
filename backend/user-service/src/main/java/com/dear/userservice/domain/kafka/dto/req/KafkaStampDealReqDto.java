package com.dear.userservice.domain.kafka.dto.req;

import lombok.Getter;

import java.util.UUID;

@Getter
public class KafkaStampDealReqDto {
    private UUID userId;
    private Long stampDealId;
    private Integer point;
    private String content;
}

