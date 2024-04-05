package com.dear.userservice.domain.point.controller;

import com.dear.userservice.domain.point.dto.res.PointHistoryResDto;
import com.dear.userservice.domain.point.repository.entity.PointHistory;
import com.dear.userservice.domain.point.service.PointService;
import com.dear.userservice.global.dto.BaseResponse;
import com.dear.userservice.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/points")
@Slf4j
@RequiredArgsConstructor
public class PointController {

    private final PointService pointService;
    private final JwtUtil jwtUtil;

    @GetMapping("/test-plus")
    public BaseResponse<PointHistory> testPlusInput(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        return BaseResponse.success(pointService.testPlusInput(userId));
    }

    @GetMapping("/test-minus")
    public BaseResponse<PointHistory> testMinusInput(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        return BaseResponse.success(pointService.testMinusInput(userId));
    }

    @GetMapping
    public BaseResponse<List<PointHistoryResDto>> getPointHistories(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        return BaseResponse.success(pointService.getPointHistories(userId));
    }
}
