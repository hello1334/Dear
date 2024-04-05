package com.dear.letterservice.domain.stampDeal.repository.availableStampDeal;

import com.dear.letterservice.domain.stampDeal.dto.GetAvailableSellStampResponse;

import java.util.List;
import java.util.UUID;

public interface AvailableStampDealRepository {
    List<GetAvailableSellStampResponse> findStampDealByUserId(UUID userId);
}
