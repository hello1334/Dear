package com.dear.userservice.domain.user.service;


import com.dear.userservice.domain.friend.dto.res.FriendResDto;
import com.dear.userservice.domain.kafka.dto.res.KafkaLetterResDto;
import com.dear.userservice.domain.kafka.producer.KafkaLetterProducer;
import com.dear.userservice.domain.s3.repository.ProfileImageRepository;
import com.dear.userservice.domain.s3.repository.entity.ProfileImage;
import com.dear.userservice.domain.s3.service.S3Service;
import com.dear.userservice.domain.user.dto.res.GetUserInfoResDto;
import com.dear.userservice.domain.user.dto.res.MypageResDto;
import com.dear.userservice.domain.user.dto.res.PointResDto;
import com.dear.userservice.domain.user.dto.res.ProfileResDto;
import com.dear.userservice.domain.user.exception.UserException;
import com.dear.userservice.domain.user.repository.UserRepository;
import com.dear.userservice.domain.user.repository.entity.User;
import com.dear.userservice.global.dto.ResponseCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProfileImageRepository profileImageRepository;
    private final S3Service s3Service;
    private final KafkaLetterProducer kafkaLetterProducer;
    @Autowired
    private ObjectMapper objectMapper;
    private volatile KafkaLetterResDto kafkaLetterResDto;
    private CountDownLatch latch = new CountDownLatch(1);

    @KafkaListener(topics = "letter-info-res", groupId = "user-group")
    public void getLetterInfoRes(String message) {
        try {
            kafkaLetterResDto = objectMapper.readValue(message, KafkaLetterResDto.class);
            latch.countDown();
        } catch (Exception e) {
            log.error("UserService.getLetterInfoRes() error", e);
        }
    }

    public MypageResDto getMyInfo(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        Optional<ProfileImage> profileImage = profileImageRepository.findByUserId(userId);

        MypageResDto mypageResDto = MypageResDto.builder()
                .nickname(user.getNickname())
                .point(user.getPoint())
                .isNickChange(false)
                .build();

        kafkaLetterProducer.sendLetterInfoReq(userId);
        try {
            latch.await();
        } catch (InterruptedException e) {
            log.error("UserService.getMyInfo() error", e);
        }

        if (kafkaLetterResDto != null) {
            mypageResDto.setStampCnt(kafkaLetterResDto.getStampCnt());
            mypageResDto.setSendCnt(kafkaLetterResDto.getSendCnt());
            mypageResDto.setRecvCnt(kafkaLetterResDto.getRecvCnt());
        }

        if(profileImage.isPresent()) {
            mypageResDto.setProfile(profileImage.get().getUrl());
        } else {
            mypageResDto.setProfile(null);
        }

        if(user.getModifyAt() != null) {
            if(LocalDateTime.now().isAfter(user.getModifyAt().plusDays(30))) {
                mypageResDto.setIsNickChange(true);
            }
        }



        return mypageResDto;
    }

    @Transactional
    public void deleteMyInfo(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        user.setWithdrawFlag(false);
        user.setWithdrawAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public void withdrawDeleteMyInfo(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        user.setWithdrawFlag(false);
        user.setWithdrawAt(null);
        userRepository.save(user);
    }

    @Transactional
    public void deleteMyInfoTotally(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        user.setWithdrawFlag(true);
        userRepository.save(user);
    }

    @Transactional
    public void deleteUsersTotally(List<User> userList) {
        userList.forEach(user -> {
            user.setWithdrawFlag(true);
        });
        userRepository.saveAll(userList);
    }

    public UUID getUserIdFromNickName(String nickname) {
        User user = userRepository.findByNickname(nickname).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        return user.getId();
    }

    @Transactional
    public void modifyNickname(UUID userId, String newNickname) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        user.setNickname(newNickname);
        userRepository.save(user);
    }

    public Boolean isExistNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    public List<User> getWithdrawUsers() {
        return userRepository.findWithdrawUsers();
    }

    public PointResDto getPoint(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        return PointResDto.builder()
                .point(user.getPoint())
                .build();
    }

    @Transactional
    public ProfileResDto modifyProfile(UUID userId, MultipartFile newProfile) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserException(ResponseCode.USER_NOT_FOUND));

        String returnUrl = s3Service.uploadFile(newProfile);
        log.info("Profile Image Upload Success : {}", returnUrl);
        ProfileImage profileImage = ProfileImage.builder()
                .url(returnUrl)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();
        profileImageRepository.save(profileImage);

        return ProfileResDto.builder()
                .profile(returnUrl)
                .build();
    }

    ////////////////////////////////////////////////
    // 유저 가짜 데이터 생성을 위해 넣어놈
    public User createUser() {
        User user = new User();
        user.setId(UUID.randomUUID()); // UUID를 직접 설정할 필요는 없습니다. JPA가 자동으로 생성합니다.
        user.setPassword("1234"); // 예시값
        user.setNickname("User" + new Random().nextInt(10000)); // 랜덤 닉네임
        user.setEmail("user" + new Random().nextInt(1000) + "@example.com"); // 랜덤 이메일
        user.setDomain("example.com"); // 고정값
        user.setPoint(new Random().nextInt(100)); // 0부터 99까지의 랜덤 포인트
        user.setWithdrawFlag(false);

        userRepository.save(user); // 사용자 정보 저장
        return user;
    }

    public List<FriendResDto> getUsersWithNickname(String nickname, UUID userId) {

        return userRepository.findByNicknameLike(nickname, userId).stream()
                .map(u -> {
                    FriendResDto friendResDto = FriendResDto.builder()
                            .friendName(u.getNickname())
                            .build();

                    Optional<ProfileImage> profileImageOptional = profileImageRepository.findByUserId(u.getId());
                    profileImageOptional.ifPresent(profileImage -> friendResDto.setImageUrl(profileImage.getUrl()));
                    return friendResDto;
                })
                .toList();
    }

    /*
    public String getUserInfo(UUID uuid) {
        Optional<User> user = userRepository.findById(uuid);
        if (user.isPresent()) {
            return user.get().getNickname();
        }
        return "";
    }
    */

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
    ///////////////////////////////////////////////////////
}
