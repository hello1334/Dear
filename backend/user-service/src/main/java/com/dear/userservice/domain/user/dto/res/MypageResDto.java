package com.dear.userservice.domain.user.dto.res;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MypageResDto {

    private String nickname;
    private String profile;
    private Integer stampCnt;
    private Integer recvCnt;
    private Integer sendCnt;
    private Integer point;
    private Boolean isNickChange;
}
