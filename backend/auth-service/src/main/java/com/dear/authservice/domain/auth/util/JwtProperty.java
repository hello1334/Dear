package com.dear.authservice.domain.auth.util;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class JwtProperty {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.accessExpirationTime}")
    private Long accessExpirationTime;

    @Value("${jwt.refreshExpirationTime}")
    private Long refreshExpirationTime;
}
