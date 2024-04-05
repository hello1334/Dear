package com.dear.userservice.domain.friend.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class FriendRequestsDto {
    private List<FriendRequestInfo> receivedRequests;
    private List<FriendRequestInfo> sentRequests;

    public FriendRequestsDto(List<FriendRequestInfo> receivedRequests, List<FriendRequestInfo> sentRequests) {
        this.receivedRequests = receivedRequests;
        this.sentRequests = sentRequests;
    }
}