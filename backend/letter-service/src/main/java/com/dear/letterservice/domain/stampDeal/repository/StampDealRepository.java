package com.dear.letterservice.domain.stampDeal.repository;

import com.dear.letterservice.domain.stampDeal.repository.availableStampDeal.AvailableStampDealRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dear.letterservice.domain.stampDeal.entity.StampDeal;

public interface StampDealRepository extends JpaRepository<StampDeal, Long>, AvailableStampDealRepository {
    Page<StampDeal> findAllByTitleContainingOrDescriptionContaining(Pageable pageable, String titleKeyword, String descriptionKeyword);
}
