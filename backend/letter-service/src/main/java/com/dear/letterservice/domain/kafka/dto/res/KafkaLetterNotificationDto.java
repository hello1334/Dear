package com.dear.letterservice.domain.kafka.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class KafkaLetterNotificationDto {

    private UUID userId;
    private String stamp;
    private String dear;
    private String from;
    private Long letterId;
    private String letter;
    private String music;
    private String musicTitle;
    private LocalDateTime createAt;
}
