package com.dear.letterservice.domain.stampDeal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetSellStampsListRequest {
    private int page;
    private int size;
    private String sort;
    private String keyword;
}
