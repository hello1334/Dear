package com.dear.letterservice.domain.stamp.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetUnReadStampsListResponse {
	private Long letterId;
	private String stamp;
	private String dear;
	private String from;
	private String music;
	private String musicTitle;
	private String letter;
	private LocalDateTime createAt;

	public static GetUnReadStampsListResponse getUnReadStampsListResponse(Long letterId, String stamp, String dear, String from,
		String music, String musicTitle, String letter, LocalDateTime createAt) {
		return GetUnReadStampsListResponse.builder()
			.letterId(letterId)
			.stamp(stamp)
			.dear(dear)
			.from(from)
			.music(music)
			.musicTitle(musicTitle)
			.letter(letter)
			.createAt(createAt)
			.build();
	}
}
