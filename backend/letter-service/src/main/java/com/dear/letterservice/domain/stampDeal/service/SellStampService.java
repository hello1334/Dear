package com.dear.letterservice.domain.stampDeal.service;

import com.dear.letterservice.domain.stampDeal.dto.AddSellStampRequest;
import com.dear.letterservice.domain.stampDeal.dto.GetAvailableSellStampResponse;
import com.dear.letterservice.domain.stampDeal.dto.GetSellStampsListResponse;

import java.util.List;
import java.util.UUID;

public interface SellStampService {

    GetSellStampsListResponse getSellStampsList(int page, int size, String sort, String keyword);
    List<GetAvailableSellStampResponse> getAvailableSellStampList(UUID userId);
    void addSellStamp(UUID userId, AddSellStampRequest addSellStampRequest);
    void delete(Long stampDealId);
}
