package com.dear.userservice.domain.friend.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class FriendRequestInfo {
    private UUID requestId;
    private UUID userId;
    private String status;
    private String imageUrl;
    private String opponentNickname;

    public FriendRequestInfo(UUID requestId, UUID userId, String status, String imageUrl, String opponentNickname) {
        this.requestId = requestId;
        this.userId = userId;
        this.status = status;
        this.imageUrl = imageUrl;
        this.opponentNickname = opponentNickname;
    }
}