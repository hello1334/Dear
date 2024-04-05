package com.dear.letterservice.domain.stampBuy.exception;

import com.dear.letterservice.global.dto.ResponseCode;
import com.dear.letterservice.global.exception.BaseException;

public class StampBuyException extends BaseException {

    public StampBuyException(ResponseCode responseCode) {
        super(responseCode);
    }
}
