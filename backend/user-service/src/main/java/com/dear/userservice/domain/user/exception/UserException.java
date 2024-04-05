package com.dear.userservice.domain.user.exception;

import com.dear.userservice.global.dto.ResponseCode;
import com.dear.userservice.global.exception.BaseException;

public class UserException extends BaseException {
    public UserException(ResponseCode responseCode) {
        super(responseCode);
    }
}
