package com.dear.letterservice.domain.kafka.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class KafkaStampDealReqDto {
    private UUID userId;
    private Long stampDealId;
    private Integer point;
    private String content;
}
