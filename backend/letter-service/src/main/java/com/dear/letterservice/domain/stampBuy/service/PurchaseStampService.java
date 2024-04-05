package com.dear.letterservice.domain.stampBuy.service;

import java.util.List;
import java.util.UUID;

import com.dear.letterservice.domain.stamp.dto.GetPurchaseStampsListResponse;

public interface PurchaseStampService {
    void purchaseStamp(UUID userId, Long stampId);
    List<GetPurchaseStampsListResponse> getPurchaseStampsList(UUID userId);

    void delete(Long stampBuyId);

    Integer getCountByUserId(UUID userId);
}
