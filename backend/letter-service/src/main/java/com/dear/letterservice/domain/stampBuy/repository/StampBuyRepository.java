package com.dear.letterservice.domain.stampBuy.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dear.letterservice.domain.stampBuy.entity.StampBuy;

public interface StampBuyRepository extends JpaRepository<StampBuy, Long> {
	List<StampBuy> findByUserId(UUID userId);

	Integer countByUserId(UUID userId);
}
