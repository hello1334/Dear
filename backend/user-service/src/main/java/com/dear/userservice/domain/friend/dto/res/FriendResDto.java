package com.dear.userservice.domain.friend.dto.res;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class FriendResDto {

    private String friendName;
    private String imageUrl;
}
