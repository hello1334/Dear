package com.dear.userservice.domain.user.repository.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity(name = "user")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private UUID id;
    private String password;
    @Nullable
    private String nickname;
    private String email;
    private String domain;
    private Integer point;
    @Nullable
    private LocalDateTime modifyAt;
    @Nullable
    private LocalDateTime withdrawAt;
    private Boolean withdrawFlag;



}
