package com.dear.userservice.domain.user.controller;

import com.dear.userservice.domain.scheduler.service.SchedulerService;
import com.dear.userservice.domain.user.dto.req.GetUserInfoReqDto;
import com.dear.userservice.domain.user.dto.req.NicknameReqDto;
import com.dear.userservice.domain.user.dto.res.GetUserInfoResDto;
import com.dear.userservice.domain.user.dto.res.MypageResDto;
import com.dear.userservice.domain.user.dto.res.PointResDto;
import com.dear.userservice.domain.user.dto.res.ProfileResDto;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.domain.user.service.UserService;
import com.dear.userservice.global.dto.BaseResponse;
import com.dear.userservice.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private final JwtUtil jwtUtil;
    private final UserService userService;
    private final SchedulerService schedulerService;

    @GetMapping("/myInfo")
    public BaseResponse<MypageResDto> getMyInfo(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        return BaseResponse.success(userService.getMyInfo(userId));
    }

    @DeleteMapping("/myInfo")
    public BaseResponse<Void> deleteMyInfo(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        userService.deleteMyInfo(userId);
        schedulerService.scheduleWithdraw(userId, LocalDateTime.now());
        return BaseResponse.success(null);
    }

    @PutMapping("/myInfo")
    public BaseResponse<Void> withdrawDeleteMyInfo(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        userService.withdrawDeleteMyInfo(userId);
        schedulerService.cancleWithdrawScheduledTask(userId);
        return BaseResponse.success(null);
    }

    @PostMapping("/id-from-nickname")
    public ResponseEntity<UUID> isExistNickname(@RequestBody Map<String, String> map) {
        return ResponseEntity.ok(userService.getUserIdFromNickName(map.get("nickname")));
    }

    @PutMapping("/nickname")
    public BaseResponse<Void> modifyNickname(HttpServletRequest request, @RequestBody NicknameReqDto nicknameReqDto) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        userService.modifyNickname(userId, nicknameReqDto.getNickname());
        return BaseResponse.success(null);
    }

    @PostMapping("/nickname")
    public BaseResponse<Boolean> isPossibleNickname(@RequestBody NicknameReqDto nicknameReqDto) {
        return BaseResponse.success(!userService.isExistNickname(nicknameReqDto.getNickname()));
    }

    @GetMapping("/point")
    public BaseResponse<PointResDto> getPoint(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        return BaseResponse.success(userService.getPoint(userId));
    }

    @PutMapping("/profile")
    public BaseResponse<ProfileResDto> modifyProfile(HttpServletRequest request, @RequestParam(value = "profile") MultipartFile profileFile) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        return BaseResponse.success(userService.modifyProfile(userId, profileFile));
    }

    /*
    @PostMapping("/userInfo")
    public String getUserInfo(@RequestBody GetUserInfoReqDto getUserInfoReqDto) {
        userService.getUserInfo(getUserInfoReqDto.getUuid());
        String nickname = userService.getUserInfo(getUserInfoReqDto.getUuid());
        return nickname;
    }
    */

    ////////////////////////////////////
    // 유저 가짜 데이터 생성을 위해 넣어놈
    @PostMapping("/create")
    public ResponseEntity<User> createUser() {
        User newUser = userService.createUser();
        return ResponseEntity.ok(newUser);
    }
    ///////////////////////////////////////////////
}
