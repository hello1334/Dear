package com.dear.userservice.domain.friend.service;

import com.dear.userservice.domain.friend.exception.FriendException;
import com.dear.userservice.domain.friend.repository.FriendRepository;
import com.dear.userservice.domain.friend.repository.FriendReqRepository;
import com.dear.userservice.domain.friend.repository.entity.Friend;
import com.dear.userservice.domain.friend.repository.entity.FriendReq;
import com.dear.userservice.domain.user.repository.UserRepository;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.global.dto.ResponseCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static com.dear.userservice.global.dto.ResponseCode.USER_ALREADY_EXISTS;

@Service
public class FriendReqService {

    private final FriendReqRepository friendReqRepository;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    public FriendReqService(FriendReqRepository friendReqRepository, UserRepository userRepository, FriendRepository friendRepository) {
        this.friendReqRepository = friendReqRepository;
        this.userRepository = userRepository;
        this.friendRepository = friendRepository;
    }

    // 예시: 사용자가 받은 친구 요청 목록 조회
    @Transactional(readOnly = true)
    public List<FriendReq> getReceivedFriendRequests(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return friendReqRepository.findByToUserAndStatus(user, FriendReq.Status.WAIT);
    }

    // 사용자가 보낸 친구 신청 목록 조회
    @Transactional(readOnly = true)
    public List<FriendReq> getSentFriendRequests(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return friendReqRepository.findByFromUserAndStatus(user, FriendReq.Status.WAIT);
    }



    // 친구요청 보내기 == 친구신청
    @Transactional
    public void sendFriendRequest(UUID fromUserId, UUID toUserId) {
        // 신청자와 수신자가 자기 자신인지 확인
        if (fromUserId.equals(toUserId)) {
            throw new FriendException(ResponseCode.TO_FROM_SAME);
        }

        // 신청자와 수신자가 존재하는 사용자인지 확인
        User fromUser = userRepository.findById(fromUserId)
                .orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST));
        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST));

        // 이미 친구 신청을 보냈는지 확인
        boolean alreadyRequested = friendReqRepository.existsByFromUserAndToUserAndStatus(fromUser, toUser, FriendReq.Status.WAIT);
        if (alreadyRequested) {
            throw new FriendException(ResponseCode.ALREAD_SEND);
        }

        // 이미 친구인지 확인
        boolean alreadyFriends = friendRepository.existsByFromUserAndToUser(fromUser, toUser) || friendRepository.existsByFromUserAndToUser(toUser, fromUser);
        if (alreadyFriends) {
            throw new FriendException(ResponseCode.ALREAD_FRIEND);
        }

        // 새로운 친구 신청을 생성하고 저장
        FriendReq newFriendReq = FriendReq.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .status(FriendReq.Status.WAIT)
                .requestAt(LocalDateTime.now())
                .build();
        friendReqRepository.save(newFriendReq);
    }


    // 닉네임을 통해 사용자의 ID를 조회하는 메서드
    public UUID findUserIdByNickname(String nickname) {
        // UserRepository에서 제공하는 메서드를 호출하여 사용자 조회
        Optional<User> user = userRepository.findByNickname(nickname);

        if(user.isPresent()) {
            return user.get().getId(); // 사용자가 존재하면 ID 반환
        } else {
            return null; // 사용자가 존재하지 않으면 null 반환
        }
    }


    // 친구요청 수락하기
    @Transactional
    public void acceptFriendRequest(UUID fromUserId, UUID toUserId) {
        FriendReq friendReq = friendReqRepository.findByFromUserAndToUserAndStatus(
                userRepository.findById(fromUserId).orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST)),
                userRepository.findById(toUserId).orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST)),
                FriendReq.Status.WAIT
        ).orElseThrow(() -> new FriendException(ResponseCode.REQUEST_NOT_EXIST));

        // 상태를 ACCEPT로 변경
        friendReq.setStatus(FriendReq.Status.ACCEPT);
        friendReqRepository.save(friendReq);

        // Friend 엔터티에 새로운 친구 관계 추가
        Friend newFriend = new Friend();
        newFriend.setFromUser(friendReq.getFromUser());
        newFriend.setToUser(friendReq.getToUser());
        friendRepository.save(newFriend);
    }

    // 친구요청 거절하기
    @Transactional
    public void refuseFriendRequest(UUID fromUserId, UUID toUserId) {
        FriendReq friendReq = friendReqRepository.findByFromUserAndToUserAndStatus(
                userRepository.findById(fromUserId).orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST)),
                userRepository.findById(toUserId).orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST)),
                FriendReq.Status.WAIT
        ).orElseThrow(() -> new FriendException(ResponseCode.REQUEST_NOT_EXIST));

        // 상태를 REFUSE로 변경
        friendReq.setStatus(FriendReq.Status.REFUSE);
        friendReqRepository.save(friendReq);
    }

    // 친구요청 취소하기
    @Transactional
    public void cancelFriendRequest(UUID fromUserId, UUID toUserId) {
        FriendReq friendReq = friendReqRepository.findByFromUserAndToUserAndStatus(
                userRepository.findById(fromUserId).orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST)),
                userRepository.findById(toUserId).orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST)),
                FriendReq.Status.WAIT
        ).orElseThrow(() -> new FriendException(ResponseCode.REQUEST_NOT_EXIST));

        // 상태를 CANCEL로 변경
        friendReq.setStatus(FriendReq.Status.CANCEL);
        friendReqRepository.save(friendReq);
    }


    //친구 삭제하기
    @Transactional
    public void deleteFriend(UUID userId, UUID friendId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST));
        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST));

        List<Friend> friends = Stream.concat(
                friendRepository.findByFromUserAndDeleteAtIsNull(user).stream(),
                friendRepository.findByToUserAndDeleteAtIsNull(user).stream()
        ).collect(Collectors.toList());

        Friend relationship = friends.stream()
                .filter(f -> f.getFromUser().equals(friend) || f.getToUser().equals(friend))
                .findFirst()
                .orElseThrow(() -> new FriendException(ResponseCode.REQUEST_NOT_EXIST));

        relationship.setDeleteAt(LocalDateTime.now());
        friendRepository.save(relationship);
    }
}