package com.dear.letterservice.domain.stamp.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetStampsListResponse {
	private Integer unReadLettersCnt;
	private List<GetStampsListStampResponse> stamps;

	public static GetStampsListResponse getStampsResponse(Integer unReadLettersCnt, List<GetStampsListStampResponse> stamps) {
		return GetStampsListResponse.builder()
			.unReadLettersCnt(unReadLettersCnt)
			.stamps(stamps)
			.build();
	}
}
