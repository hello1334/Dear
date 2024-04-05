package com.dear.userservice.domain.point.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PointHistoryResDto {
    private Long id;
    private String content;
    private Integer point;
    private Integer totalPoint;
    private LocalDateTime createdAt;
}
