package com.dear.userservice.domain.notification.dto.res;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class MessageResDto {

    private String stamp;
    private String dear;
    private String from;
    private Long letterId;
    private String letter;
    private String music;
    private String musicTitle;
    private LocalDateTime createAt;
}
