package com.dear.userservice.global.dto;

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

    //
    INVALID_USER_FORM(1000, "유저 정보가 올바르지 않습니다."),
    USER_NOT_FOUND(1001, "유저를 찾을 수 없습니다."),
    USER_ALREADY_EXISTS(1002, "이미 존재하는 유저입니다."),

    //
    NO_POINT(1003, "포인트가 부족합니다."),

    /*
     * 이 부분에 처리할 예외를 하나씩 추가하기
     * 도메인 별로 묶어서 코드 작성!!
     */

    // friend
    TO_FROM_SAME(1101,"신청자와 수신자가 자기 자신인지 확인"),
    TO_FROM_ISEXST(1102,"신청자와 수신자가 존재하는 사용자인지 확인"),
    ALREAD_SEND(1103,"이미 친구 신청을 보냈는지 확인"),
    ALREAD_FRIEND(1104,"이미 친구인지 확인"),
    REQUEST_NOT_EXIST(1105, "친구 요청이 없습니다");




    private final int code;
    private final String message;
}