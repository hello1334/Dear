package com.dear.userservice.domain.notification.controller;

import com.dear.userservice.domain.notification.dto.req.MessageReqDto;
import com.dear.userservice.domain.notification.service.NotificationService;
import com.dear.userservice.domain.user.exception.UserException;
import com.dear.userservice.domain.user.repository.UserRepository;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.global.dto.ResponseCode;
import com.dear.userservice.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @GetMapping
    public String testNotification(HttpServletRequest request) {

        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);

        MessageReqDto messageReqDto = MessageReqDto.builder()
            .userId(userId)
            .stamp("stamp")
            .dear("dear")
            .from("from")
            .letterId(1L)
            .letter("letter")
            .music(null)
            .musicTitle(null)
            .createAt(LocalDateTime.now())
            .build();

        notificationService.sendNotification(messageReqDto);

        return "OK";
    }
}
