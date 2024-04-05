package com.dear.letterservice.domain.stampDeal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddSellStampRequest {
    private Long stampId;
    private Integer price;
    private String title;
    private String content;
}
