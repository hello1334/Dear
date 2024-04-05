package com.dear.letterservice.domain.kafka.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class KafkaLetterResDto {

    private Integer stampCnt;
    private Integer recvCnt;
    private Integer sendCnt;
}
