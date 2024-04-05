package com.dear.userservice.domain.friend.repository.entity;

import com.dear.userservice.domain.user.repository.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity @Getter @Setter
@Table(name = "friend")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Friend {

    @Id // 이제 jakarta.persistence.Id를 사용합니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user", referencedColumnName = "user_id")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user", referencedColumnName = "user_id")
    private User toUser;

    @Column(name = "delete_at")
    private LocalDateTime deleteAt;

    // 기본 생성자, 생성자, getter 및 setter 생략
}