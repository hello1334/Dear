package com.dear.letterservice.domain.stampDeal.exception;

import com.dear.letterservice.global.dto.ResponseCode;
import com.dear.letterservice.global.exception.BaseException;

public class StampDealException extends BaseException {

    public StampDealException(ResponseCode responseCode) {
        super(responseCode);
    }
}
