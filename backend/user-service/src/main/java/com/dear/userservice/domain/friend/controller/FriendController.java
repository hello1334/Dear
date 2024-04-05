package com.dear.userservice.domain.friend.controller;


import com.dear.userservice.domain.friend.dto.req.*;
import com.dear.userservice.domain.friend.dto.res.FriendResDto;
import com.dear.userservice.domain.friend.dto.res.FriendResponseDto;
import com.dear.userservice.domain.friend.exception.FriendException;
import com.dear.userservice.domain.friend.service.FriendReqService;
import com.dear.userservice.domain.friend.service.FriendService;
import com.dear.userservice.domain.s3.service.S3Service;
import com.dear.userservice.domain.user.dto.req.NicknameReqDto;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.domain.user.service.UserService;
import com.dear.userservice.global.dto.BaseResponse;
import com.dear.userservice.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;
    private final FriendReqService friendReqService;
    private final UserService userService;
    private final S3Service s3Service;
    private final JwtUtil jwtUtil;


    @PostMapping
    public BaseResponse<List<FriendResDto>> getUsersWithNickname (@RequestBody NicknameReqDto nicknameReqDto, HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
        return BaseResponse.success(userService.getUsersWithNickname(nicknameReqDto.getNickname(), userId));
    }

    // 친구 목록 조회
    @GetMapping("/myFriend")
    public ResponseEntity<BaseResponse<List<FriendResponseDto>>> getFriends(HttpServletRequest request) {
        UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);

        if (userId == null) {
            System.out.println("no match user");
            return null;
        }

        List<FriendResponseDto> friends = friendService.getFriendsByUserId(userId).stream()
                .map(user -> {
                    String imageUrl = s3Service.getLatestProfileImageUrlByUserId(user.getId());
                    return FriendResponseDto.builder()
                            .friendId(user.getId())
                            .friendName(user.getNickname())
                            .imageUrl(imageUrl) // 프로필 이미지 URL 추가
                            .build();
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(BaseResponse.success(friends));
    }
    // 친구신청
    @PostMapping("/requests")
    public BaseResponse<String> sendFriendRequest(HttpServletRequest request, @RequestBody FriendSendDto friendSendDto) {
        try {
            // 받는 사람의 닉네임으로 UUID를 찾는 로직이 필요함
            // 예를 들어, friendReqService에서 제공하는 메서드를 사용한다고 가정
            UUID fromUserId = jwtUtil.extractUserIdFromExpiredToken(request);
            if (fromUserId == null) {
                System.out.println("no match fromuser");
                return null;
            }

            UUID toUserId = friendReqService.findUserIdByNickname(friendSendDto.getToUserNickname());
            if (toUserId == null) {
                System.out.println("no match touser");
                return null;
            }

            friendReqService.sendFriendRequest(fromUserId, toUserId);
            // 성공 응답
            return BaseResponse.success("Friend request sent successfully.");
        } catch (FriendException e) {
            // 실패 응답
//            log.info("friendException: {}", e.getMessage());
            return BaseResponse.fail(e.getResponseCode(),null);
        }
    }


    // 친구 신청 목록 [ receive, send]
    @GetMapping("/requests")
    public BaseResponse<FriendRequestsDto> getFriendRequests(HttpServletRequest request) {
        try {

            UUID userId = jwtUtil.extractUserIdFromExpiredToken(request);
            if (userId == null) {
                System.out.println("no match user");
                return null;
            }

            List<FriendRequestInfo> receivedRequests = friendReqService.getReceivedFriendRequests(userId)
                    .stream()
                    .map(r -> {
                        String imageUrl = s3Service.getLatestProfileImageUrlByUserId(r.getFromUser().getId());
                        String opponentNickname = r.getFromUser().getNickname();
                        return new FriendRequestInfo(r.getToUser().getId(),
                                r.getFromUser().getId(),
                                r.getStatus().toString(),
                                imageUrl,
                                opponentNickname);
                    })
                    .collect(Collectors.toList());

            List<FriendRequestInfo> sentRequests = friendReqService.getSentFriendRequests(userId)
                    .stream()
                    .map(r -> {
                        String imageUrl = s3Service.getLatestProfileImageUrlByUserId(r.getToUser().getId());
                        String opponentNickname = r.getToUser().getNickname();
                        return new FriendRequestInfo(
                                r.getFromUser().getId(),
                                r.getToUser().getId(),
                                r.getStatus().toString(),
                                imageUrl,
                                opponentNickname);
                    })
                    .collect(Collectors.toList());

            FriendRequestsDto friendRequests = new FriendRequestsDto(receivedRequests, sentRequests);
//            return ResponseEntity.ok(friendRequests);
            return BaseResponse.success(friendRequests);
        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            return null;
        }
    }


    // 친구 신청 수락
    @PostMapping("/requests/accept")
    public BaseResponse<String> acceptFriendRequest(@RequestBody FriendAcceptanceDto acceptanceDto) {
        try {

            UUID fromUserId = friendReqService.findUserIdByNickname(acceptanceDto.getFromUserNickname());
            if (fromUserId == null) {
                System.out.println("no match user");
                return null;
            }

            UUID toUserId = friendReqService.findUserIdByNickname(acceptanceDto.getToUserNickname());
            if (toUserId == null) {
                System.out.println("no match user");
                return null;
            }

            friendReqService.acceptFriendRequest(fromUserId, toUserId);
            return BaseResponse.success("Friend request accepted successfully.");
        } catch (Exception e) {
            return null;
        }
    }


    // 친구 신청 거절
    @PutMapping("/requests/refuse")
    public BaseResponse<String> rejectFriendRequest(@RequestBody FriendAcceptanceDto acceptanceDto) {
        try {

            UUID fromUserId = friendReqService.findUserIdByNickname(acceptanceDto.getFromUserNickname());
            if (fromUserId == null) {
                System.out.println("no match user");
                return null;
            }

            UUID toUserId = friendReqService.findUserIdByNickname(acceptanceDto.getToUserNickname());
            if (toUserId == null) {
                System.out.println("no match user");
                return null;
            }

            friendReqService.refuseFriendRequest(fromUserId, toUserId);
            return BaseResponse.success("Friend request refused successfully.");
        } catch (Exception e) {
            return null;
        }
    }


    // 친구 신청 취소
    @PutMapping("/requests/cancel")
    public BaseResponse<String> cancelFriendRequest(@RequestBody FriendAcceptanceDto acceptanceDto) {
        try {

            UUID fromUserId = friendReqService.findUserIdByNickname(acceptanceDto.getFromUserNickname());
            if (fromUserId == null) {
                System.out.println("no match user");
                return null;
            }

            UUID toUserId = friendReqService.findUserIdByNickname(acceptanceDto.getToUserNickname());
            if (toUserId == null) {
                System.out.println("no match user");
                return null;
            }

            friendReqService.cancelFriendRequest(fromUserId, toUserId);
            return BaseResponse.success("Friend request cancelled successfully.");
        } catch (Exception e) {
            return null;
        }
    }


    // 친구 삭제하기
    @PutMapping("/delete")
    public BaseResponse<String> deleteFriend(@RequestBody FriendAcceptanceDto acceptanceDto) {
        try {

            UUID fromUserId = friendReqService.findUserIdByNickname(acceptanceDto.getFromUserNickname());
            if (fromUserId == null) {
                System.out.println("no match fromuser");
                return null;
            }

            UUID toUserId = friendReqService.findUserIdByNickname(acceptanceDto.getToUserNickname());
            if (toUserId == null) {
                System.out.println("no match touser");
                return null;
            }

            friendService.deleteFriend(fromUserId, toUserId);
            return BaseResponse.success("Friend successfully deleted.");
        } catch (Exception e) {
            return null;
        }
    }


    ///////////////////////////////////////////////////////////////////////
    // 이건 연습 코드
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        for (User user : users) {
            System.out.println(user.getId());
            System.out.println("id");
        }
        return ResponseEntity.ok(users);
    }
    ////////////////////////////////////////////////////////////////////////
}