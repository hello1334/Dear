package com.dear.letterservice.domain.stampDeal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetSellStampResponse {
    private Long id;
    private String url;
    private String title;
    private String content;
    private Integer price;

    public static GetSellStampResponse getSellStampResponse(Long id, String url, String title, String content, Integer price) {
        return GetSellStampResponse.builder()
                .id(id)
                .url(url)
                .title(title)
                .content(content)
                .price(price)
                .build();
    }
}
