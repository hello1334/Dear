package com.dear.letterservice.domain.letter.exception;

import com.dear.letterservice.global.dto.ResponseCode;
import com.dear.letterservice.global.exception.BaseException;

public class LetterException extends BaseException {

    public LetterException(ResponseCode responseCode) {
        super(responseCode);
    }
}
