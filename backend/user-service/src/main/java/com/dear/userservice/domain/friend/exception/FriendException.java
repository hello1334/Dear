package com.dear.userservice.domain.friend.exception;

import com.dear.userservice.global.dto.ResponseCode;
import com.dear.userservice.global.exception.BaseException;

public class FriendException extends BaseException {
    public FriendException(ResponseCode responseCode) {
        super(responseCode);
    }
}
