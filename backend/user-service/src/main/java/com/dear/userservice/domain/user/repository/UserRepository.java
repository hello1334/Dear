package com.dear.userservice.domain.user.repository;

import com.dear.userservice.domain.user.repository.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmailAndDomain(String email, String domain);

    Boolean existsByNickname(String nickname);


    @Query(value = "SELECT * from user u where u.withdraw_at IS NOT NULL ORDER BY u.withdraw_at DESC",nativeQuery = true)
    List<User> findWithdrawUsers();

    Optional<User> findByNickname(String nickname);

    @Query(value = "SELECT *\n" +
            "FROM user u\n" +
            "WHERE u.nickname LIKE CONCAT('%', :nickname, '%')\n" +
            "AND u.withdraw_flag = false\n" +
            "AND u.user_id != :userId\n" +
            "AND u.user_id NOT IN (\n" +
            "    SELECT f.to_user\n" +
            "    FROM friend f\n" +
            "    WHERE f.from_user = :userId)\n" +
            "AND u.user_id NOT IN (\n" +
            "    SELECT f.from_user\n" +
            "    FROM friend f\n" +
            "    WHERE f.to_user = :userId)\n" +
            "AND u.user_id NOT IN (\n" +
            "    SELECT fr.to_user\n" +
            "    FROM friend_req fr\n" +
            "    WHERE fr.from_user = :userId\n" +
            "    AND fr.status = 'WAIT')", nativeQuery = true)
    List<User> findByNicknameLike(String nickname, UUID userId);
}
