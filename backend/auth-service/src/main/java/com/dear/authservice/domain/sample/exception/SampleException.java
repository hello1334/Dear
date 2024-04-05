package com.dear.authservice.domain.sample.exception;

import com.dear.authservice.global.dto.ResponseCode;
import com.dear.authservice.global.exception.BaseException;

public class SampleException extends BaseException {

    public SampleException(ResponseCode responseCode) {
        super(responseCode);
    }

}