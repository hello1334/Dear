package com.dear.letterservice.domain.letter.controller;

import com.dear.letterservice.domain.letter.dto.req.LetterReqDto;
import com.dear.letterservice.domain.letter.dto.req.LetterTemplateReqDto;
import com.dear.letterservice.domain.letter.dto.res.LetterTemplateResDto;
import com.dear.letterservice.domain.letter.service.LetterService;
import com.dear.letterservice.global.dto.BaseResponse;
import com.dear.letterservice.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/letters")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;
    private final JwtUtil jwtUtil;

    @PostMapping("/template")
    public BaseResponse<LetterTemplateResDto> generateLetterTemplate(@RequestBody LetterTemplateReqDto letterTemplateReqDto) {
        return BaseResponse.success(letterService.generateLetterTemplate(letterTemplateReqDto));
    }

    @PostMapping
    public BaseResponse<Void> sendLetter(@RequestPart(value = "letter") MultipartFile letter,
        @RequestPart(value = "stampFile") MultipartFile stampFile,
        @RequestPart(value = "letterReqDto") LetterReqDto letterReqDto, HttpServletRequest request) {
        UUID fromUserId = jwtUtil.extractUserId(request);
        letterService.sendLetter(letter, stampFile, letterReqDto, fromUserId);
        return BaseResponse.success(null);
    }
}
