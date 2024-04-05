package com.dear.authservice.domain.auth.dto.res;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignInResDto {
    private String accessToken;
    private String nickname;
    private String profile;
    private Boolean isGhost;
}
