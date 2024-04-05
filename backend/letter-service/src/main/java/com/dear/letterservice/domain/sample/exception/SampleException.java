package com.dear.letterservice.domain.sample.exception;

import com.dear.letterservice.global.dto.ResponseCode;
import com.dear.letterservice.global.exception.BaseException;

public class SampleException extends BaseException {

    public SampleException(ResponseCode responseCode) {
        super(responseCode);
    }

}