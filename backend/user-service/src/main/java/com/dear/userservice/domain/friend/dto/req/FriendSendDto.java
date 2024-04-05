package com.dear.userservice.domain.friend.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class FriendSendDto {
    private String fromUserNickname; // 친구 신청을 보내는 사람의 ID
    private String toUserNickname; // 친구 신청을 받는 사람의 닉네임
}