package com.dear.letterservice.domain.stampDeal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetSellStampsListResponse {
    int totalPage;
    long totalSize;
    private List<GetSellStampResponse> stamps;

    public static GetSellStampsListResponse getSellStampResponse(int totalPage, long totalSize, List<GetSellStampResponse> stamps) {
        return GetSellStampsListResponse.builder().totalPage(totalPage).totalSize(totalSize).stamps(stamps).build();
    }
}
