package com.dear.userservice.domain.friend.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendResponseDto {
    private UUID friendId;
    private String friendName;
    private String imageUrl;
    // 필요에 따라 추가 정보를 포함할 수 있습니다.
}