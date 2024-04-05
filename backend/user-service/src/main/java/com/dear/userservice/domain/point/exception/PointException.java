package com.dear.userservice.domain.point.exception;

import com.dear.userservice.global.dto.ResponseCode;
import com.dear.userservice.global.exception.BaseException;

public class PointException extends BaseException {

    public PointException(ResponseCode responseCode) {
        super(responseCode);
    }
}
