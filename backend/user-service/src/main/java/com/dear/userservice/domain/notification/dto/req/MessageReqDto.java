package com.dear.userservice.domain.notification.dto.req;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MessageReqDto {

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
