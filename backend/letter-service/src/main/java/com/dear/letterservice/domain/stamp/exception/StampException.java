package com.dear.letterservice.domain.stamp.exception;

import com.dear.letterservice.global.dto.ResponseCode;
import com.dear.letterservice.global.exception.BaseException;

public class StampException extends BaseException {

    public StampException(ResponseCode responseCode) {
        super(responseCode);
    }
}
