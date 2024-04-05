package com.dear.letterservice.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/*
 * code와 message를 커스텀해서 사용
 * 보통 예외에 대한 code와 msg 직접 커스텀
 */
@AllArgsConstructor
@Getter
public enum ResponseCode {

    // 200 OK
    OK(HttpStatus.OK.value(), "OK"),

    // Sample
    SAMPLE_EXCEPTION(9999, "샘플예외 입니다."),

    NO_AUTHORIZATION_HEADER(999, "인증 헤더가 없습니다."),
    STAMP_DEAL_NOT_FOUND(1001, "판매 우표를 찾을 수 없습니다."),
    STAMP_NOT_FOUND(1002, "우표를 찾을 수 없습니다."),
    STAMP_BUY_NOT_FOUND(1003, "구매 우표를 찾을 수 없습니다."),
    NO_POINT(1004, "포인트가 없습니다."),
    NO_LETTER(3000, "편지가 없습니다.");


    private final int code;
    private final String message;
}