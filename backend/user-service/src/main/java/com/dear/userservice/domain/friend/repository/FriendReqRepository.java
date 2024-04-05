package com.dear.userservice.domain.friend.repository;

import com.dear.userservice.domain.friend.repository.entity.FriendReq;
import com.dear.userservice.domain.friend.repository.entity.FriendReq.Status;
import com.dear.userservice.domain.user.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface FriendReqRepository extends JpaRepository<FriendReq, UUID> {
    // 특정 사용자에게 온 모든 친구 요청을 상태별로 조회합니다.
    List<FriendReq> findByFromUserAndStatus(User fromUser, Status status);

    // 특정 사용자가 보낸 모든 친구 요청을 상태별로 조회합니다.
    List<FriendReq> findByToUserAndStatus(User toUser, Status status);

    Optional<FriendReq> findByFromUserAndToUserAndStatus(User fromUser, User toUser, FriendReq.Status status);

    boolean existsByFromUserAndToUserAndStatus(User fromUser, User toUser, FriendReq.Status status);
}