package com.dear.letterservice.domain.stamp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetPurchaseStampsListResponse {
	private Long stampId;
	private String image;

	public static GetPurchaseStampsListResponse getPurchaseStampsListResponse(Long stampId, String image) {
		return GetPurchaseStampsListResponse.builder()
			.stampId(stampId)
			.image(image)
			.build();
	}
}
