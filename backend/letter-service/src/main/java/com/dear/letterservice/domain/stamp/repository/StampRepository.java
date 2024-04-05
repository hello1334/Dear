package com.dear.letterservice.domain.stamp.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dear.letterservice.domain.stamp.entity.Stamp;

public interface StampRepository extends JpaRepository<Stamp, Long> {
	List<Stamp> findByToUserId(UUID toUserId);

	List<Stamp> findByFromUserId(UUID userId);

	Integer countByToUserId(UUID toUserId);
	Integer countByFromUserId(UUID fromUserId);
}
