package com.dear.userservice.domain.sample.exception;

import com.dear.userservice.global.dto.ResponseCode;
import com.dear.userservice.global.exception.BaseException;

public class SampleException extends BaseException {

    public SampleException(ResponseCode responseCode) {
        super(responseCode);
    }

}