package com.dear.userservice.domain.notification.service;

import com.dear.userservice.domain.notification.dto.req.MessageReqDto;
import com.dear.userservice.domain.notification.dto.res.MessageResDto;
import com.dear.userservice.domain.user.exception.UserException;
import com.dear.userservice.domain.user.repository.UserRepository;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.global.dto.ResponseCode;
import com.dear.userservice.global.util.JwtUtil;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SimpMessageSendingOperations sendingOperations;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public void sendNotification(MessageReqDto messageReqDto) {

        User user = userRepository.findById(messageReqDto.getUserId()).orElseThrow(
            () -> new UserException(ResponseCode.USER_NOT_FOUND));

        MessageResDto messageResDto = MessageResDto.builder()
            .stamp(messageReqDto.getStamp())
            .dear(messageReqDto.getDear())
            .from(messageReqDto.getFrom())
            .letterId(messageReqDto.getLetterId())
            .letter(messageReqDto.getLetter())
            .music(messageReqDto.getMusic())
            .musicTitle(messageReqDto.getMusicTitle())
            .createAt(messageReqDto.getCreateAt())
            .build();

        log.info("URLEncoder.encode(user.getNickname(), StandardCharsets.UTF_8) = {}", URLEncoder.encode(user.getNickname(),
            StandardCharsets.UTF_8));
        sendingOperations.convertAndSend("/topic/notification/" + URLEncoder.encode(user.getNickname(),
            StandardCharsets.UTF_8), messageResDto);
    }
}