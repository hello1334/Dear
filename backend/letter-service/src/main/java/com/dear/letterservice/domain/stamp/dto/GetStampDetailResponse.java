package com.dear.letterservice.domain.stamp.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetStampDetailResponse {
	private String dear;
	private String from;
	private String musicUrl;
	private String musicTitle;
	private String letterUrl;
	private LocalDateTime createAt;

	public static GetStampDetailResponse getStampDetailResponse(String dear, String from, String musicUrl, String musicTitle, String letterUrl, LocalDateTime createAt) {
		return GetStampDetailResponse.builder()
			.dear(dear)
			.from(from)
			.musicUrl(musicUrl)
			.musicTitle(musicTitle)
			.letterUrl(letterUrl)
			.createAt(createAt)
			.build();
	}
}
