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
public class KafkaStampBuyReqDto {
    private UUID userId;
    private UUID sellerId;
    private Long stampBuyId;
    private Integer userPoint;
    private Integer sellerPoint;
    private String userContent;
    private String sellerContent;
}
