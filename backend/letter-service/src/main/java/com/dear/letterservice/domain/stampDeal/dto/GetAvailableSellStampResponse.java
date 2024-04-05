package com.dear.letterservice.domain.stampDeal.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetAvailableSellStampResponse {
    private Long id;
    private String url;

    public static GetAvailableSellStampResponse getAvailableSellStampResponse(Long id, String url) {
        return GetAvailableSellStampResponse.builder()
                .id(id)
                .url(url)
                .build();
    }
}
