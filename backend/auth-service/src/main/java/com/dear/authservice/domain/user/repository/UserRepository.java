package com.dear.authservice.domain.user.repository;

import com.dear.authservice.domain.user.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    @Query(value = "SELECT * FROM user u WHERE u.email = :email AND u.domain = :domain "
            + "AND u.withdraw_flag = false", nativeQuery = true)
    Optional<User> findUser(@Param(value = "email") String email, @Param(value = "domain") String domain);
}
