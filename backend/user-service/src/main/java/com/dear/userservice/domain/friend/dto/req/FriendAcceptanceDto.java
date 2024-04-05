package com.dear.userservice.domain.friend.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class FriendAcceptanceDto {
    private String fromUserNickname;
    private String toUserNickname;
}