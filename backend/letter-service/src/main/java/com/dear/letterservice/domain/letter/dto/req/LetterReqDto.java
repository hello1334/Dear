package com.dear.letterservice.domain.letter.dto.req;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class LetterReqDto {

    private String dearNickname;
    private String dear;
    private String from;
    private Boolean isNew;
    private Long stampId;
}
