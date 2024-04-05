package com.dear.letterservice.global.exception;

import com.dear.letterservice.global.dto.ResponseCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

/*
 * 공통 예외 class
 */
@AllArgsConstructor
@Getter
public class BaseException extends RuntimeException {

    private final ResponseCode responseCode;

    @Override
    public String getMessage() {
        return responseCode.getMessage();
    }
}