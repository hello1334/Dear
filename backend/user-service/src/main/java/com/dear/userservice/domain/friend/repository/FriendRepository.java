package com.dear.userservice.domain.friend.repository;

import com.dear.userservice.domain.friend.repository.entity.Friend;
import com.dear.userservice.domain.user.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    // 소프트 삭제되지 않은 친구 목록을 조회하는 메서드
    List<Friend> findByFromUserAndDeleteAtIsNull(User user);
    List<Friend> findByToUserAndDeleteAtIsNull(User user);

    // 두 사용자 사이에 친구 관계가 존재하는지 확인하는 메서드
    boolean existsByFromUserAndToUser(User fromUser, User toUser);
    boolean existsByToUserAndFromUser(User toUser, User fromUser);
}