package com.dear.authservice.domain.auth.service;

import com.dear.authservice.domain.auth.dto.req.SignInReqDto;
import com.dear.authservice.domain.auth.dto.req.SignUpReqDto;
import com.dear.authservice.domain.auth.dto.res.SignInResDto;
import com.dear.authservice.domain.auth.util.JwtUtil;
import com.dear.authservice.domain.s3.repository.ProfileImageRepository;
import com.dear.authservice.domain.s3.repository.entity.ProfileImage;
import com.dear.authservice.domain.user.exception.UserException;
import com.dear.authservice.domain.user.repository.UserRepository;
import com.dear.authservice.domain.user.repository.entity.User;
import com.dear.authservice.global.dto.ResponseCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final ProfileImageRepository profileImageRepository;

    // 회원 가입 여부 확인
    public boolean isExistUser(String email, String domain) {
        return userRepository.findUser(email, domain).isPresent();
    }

    // 회원가입
    @Transactional
    public void signUp(SignUpReqDto signUpReqDto) {
        boolean exsitUser = userRepository.findUser(signUpReqDto.getEmail(),
                signUpReqDto.getDomain()).isPresent();
        if (exsitUser) {
            throw new UserException(ResponseCode.USER_ALREADY_EXISTS);
        }

        log.info("new User SignUp = {} / {}", signUpReqDto.getEmail(), signUpReqDto.getDomain());
        User user = User.builder()
                .email(signUpReqDto.getEmail())
                .password(passwordEncoder.encode("1234"))
                .domain(signUpReqDto.getDomain())
                .point(0)
                .withdrawFlag(false)
                .build();
        userRepository.save(user);
    }

    // 로그인
    @Transactional
    public SignInResDto signIn(SignInReqDto signInDto) {
        User user = userRepository.findUser(signInDto.getEmail(), signInDto.getDomain())
                .orElseThrow(() -> new UserException(ResponseCode.USER_NOT_FOUND));

        // accessToken 생성
        Authentication authentication = null;
        authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail()+":"+user.getDomain()+":"+String.valueOf(user.getId()), "1234")
        );
        String accessToken = jwtUtil.createAccessToken(authentication, user);

        // refreshToken 생성
        jwtUtil.createRefreshToken(authentication, user);

        log.info("User Login = {} / {}", signInDto.getEmail(), signInDto.getDomain());

        Optional<ProfileImage> profileImage = profileImageRepository.findByUserId(user.getId());

        SignInResDto signInResDto = SignInResDto.builder()
                .accessToken(accessToken)
                .nickname(user.getNickname())
                .isGhost(false)
                .build();

        if(profileImage.isPresent()) {
            signInResDto.setProfile(profileImage.get().getUrl());
        } else {
            signInResDto.setProfile(null);
        }

        if(user.getWithdrawAt() != null) {
            signInResDto.setIsGhost(true);
        }

        return signInResDto;
    }
}
