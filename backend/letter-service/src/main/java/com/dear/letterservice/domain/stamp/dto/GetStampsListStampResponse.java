package com.dear.letterservice.domain.stamp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetStampsListStampResponse {
	private Long stampId;
	private String image;

	public static GetStampsListStampResponse getStampsListStampResponse(Long stampId, String image) {
		return GetStampsListStampResponse.builder()
			.stampId(stampId)
			.image(image)
			.build();
	}
}
