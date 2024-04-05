package com.dear.userservice.domain.s3.repository;

import com.dear.userservice.domain.s3.repository.entity.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {

    @Query(value = "SELECT * FROM profile_image pi WHERE pi.user_id = :userId ORDER BY pi.created_at DESC LIMIT 1", nativeQuery = true)
    Optional<ProfileImage> findByUserId(UUID userId);
}
