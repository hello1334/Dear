package com.dear.authservice.domain.user.service;

import com.dear.authservice.domain.user.exception.UserException;
import com.dear.authservice.domain.user.repository.UserRepository;
import com.dear.authservice.domain.user.repository.entity.User;
import com.dear.authservice.global.dto.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserDetailServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // username을 email과 domain으로 나누어서 추출
        String[] parts = username.split(":");
        if (parts.length != 3) {
            throw new UserException(ResponseCode.INVALID_USER_FORM);
        }

        User user = userRepository.findById(UUID.fromString(parts[2])).orElseThrow(() -> new UserException(ResponseCode.USER_NOT_FOUND));
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getDomain(), String.valueOf(user.getId()), grantedAuthorities);
    }

    public static class CustomUserDetails extends org.springframework.security.core.userdetails.User {
        private final String domain;
        private final String userId;

        public CustomUserDetails(String username, String password, String domain, String userId, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, authorities);
            this.domain = domain;
            this.userId = userId;
        }

        public String getDomain() {
            return domain;
        }

        public String getUserId() {
            return userId;
        }
    }
}
