package com.dear.authservice.global.dto;

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


    /*
     * 이 부분에 처리할 예외를 하나씩 추가하기
     * 도메인 별로 묶어서 코드 작성!!
     */
    INVALID_USER_FORM(1000, "유저 정보가 올바르지 않습니다."),
    USER_NOT_FOUND(1001, "유저를 찾을 수 없습니다."),
    USER_ALREADY_EXISTS(1002, "이미 존재하는 유저입니다.");



    private final int code;
    private final String message;
}