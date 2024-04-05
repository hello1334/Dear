package com.dear.userservice.domain.friend.repository.entity;

import com.dear.userservice.domain.user.repository.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity @Getter @Setter
@Table(name = "friend_req")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendReq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_req_id")
    private Long friendReqId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user", nullable = false)
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user", nullable = false)
    private User toUser;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "request_at", nullable = false)
    private LocalDateTime requestAt;

    // Getter와 Setter

    public enum Status {
        WAIT, ACCEPT, REFUSE, CANCEL
    }

    // 여기에 getter, setter 및 생성자 추가
}