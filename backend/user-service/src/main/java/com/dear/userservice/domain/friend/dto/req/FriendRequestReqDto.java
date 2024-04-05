package com.dear.userservice.domain.friend.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class FriendRequestReqDto {
    private UUID fromUserId;
    private UUID toUserId;
}