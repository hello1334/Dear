package com.dear.letterservice.global.exception;

import com.dear.letterservice.domain.sample.exception.SampleException;
import com.dear.letterservice.domain.stampDeal.exception.StampDealException;
import com.dear.letterservice.domain.stamp.exception.StampException;
import com.dear.letterservice.global.dto.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/*
 * 예외를 처리하는 핸들러
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /*
     * controller에서 던져진 SampleException을 처리한다.
     * @ExceptionHandler(<처리할 예외>.class) annotation을 이용
     * 예외가 발생한 순간 -> log 찍기
     * BaseResponse.fail()를 이용하여 사용자 커스텀한 코드 및 메시지를 응답으로 보내기
     */
    @ExceptionHandler(SampleException.class)
    public BaseResponse<Void> handleSampleException(SampleException e) {
        log.info("SampleException: {}", e.getMessage());
        return BaseResponse.fail(e.getResponseCode(), null);
    }

    @ExceptionHandler(StampDealException.class)
    public BaseResponse<Void> stampDealException(StampDealException e) {
        log.info("StampDealException: {}", e.getMessage());
        return BaseResponse.fail(e.getResponseCode(), null);
    }

    @ExceptionHandler(StampException.class)
    public BaseResponse<Void> stampException(StampException e) {
        log.info("StampException: {}", e.getMessage());
        return BaseResponse.fail(e.getResponseCode(), null);
    }
}