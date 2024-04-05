package com.dear.userservice.domain.kafka.dto.res;

import lombok.Getter;

@Getter
public class KafkaLetterResDto {

    private Integer stampCnt;
    private Integer recvCnt;
    private Integer sendCnt;
}
