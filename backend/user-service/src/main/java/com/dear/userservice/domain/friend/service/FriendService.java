package com.dear.userservice.domain.friend.service;

import com.dear.userservice.domain.friend.exception.FriendException;
import com.dear.userservice.domain.friend.repository.FriendRepository;
import com.dear.userservice.domain.friend.repository.entity.Friend;
import com.dear.userservice.domain.user.repository.UserRepository;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.global.dto.ResponseCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    public FriendService(FriendRepository friendRepository, UserRepository userRepository) {
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
    }

    // 친구 목록 조회
    @Transactional(readOnly = true)
    public List<User> getFriendsByUserId(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST));

        // 소프트 삭제되지 않은 친구 관계만 조회
        List<Friend> friendsFromUser = friendRepository.findByFromUserAndDeleteAtIsNull(user);
        List<Friend> friendsToUser = friendRepository.findByToUserAndDeleteAtIsNull(user);

        // 두 리스트를 병합하고, 중복을 제거하여 최종 친구 목록을 생성
        List<User> friends = Stream.concat(friendsFromUser.stream(), friendsToUser.stream())
                .map(friend -> friend.getFromUser().equals(user) ? friend.getToUser() : friend.getFromUser())
                .distinct()
                .collect(Collectors.toList());

        return friends;
    }

    @Transactional
    public void deleteFriend(UUID fromUserId, UUID toUserId) {
        User fromUser = userRepository.findById(fromUserId)
                .orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST));
        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new FriendException(ResponseCode.TO_FROM_ISEXST));

        // 소프트 삭제되지 않은 친구 관계를 조회합니다.
        List<Friend> friendsFromUser = friendRepository.findByFromUserAndDeleteAtIsNull(fromUser);
        List<Friend> friendsToUser = friendRepository.findByToUserAndDeleteAtIsNull(toUser);

        // 두 리스트를 병합하여 삭제 대상을 필터링하고 처리합니다.
        Stream.concat(friendsFromUser.stream(), friendsToUser.stream())
                .filter(friend -> (friend.getFromUser().equals(fromUser) && friend.getToUser().equals(toUser)) ||
                        (friend.getFromUser().equals(toUser) && friend.getToUser().equals(fromUser)))
                .forEach(friend -> {
                    friend.setDeleteAt(LocalDateTime.now());
                    friendRepository.save(friend);
                });

    }
}