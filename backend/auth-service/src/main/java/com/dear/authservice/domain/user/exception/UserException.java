package com.dear.authservice.domain.user.exception;

import com.dear.authservice.global.dto.ResponseCode;
import com.dear.authservice.global.exception.BaseException;

public class UserException extends BaseException {
    public UserException(ResponseCode responseCode) {
        super(responseCode);
    }
}
