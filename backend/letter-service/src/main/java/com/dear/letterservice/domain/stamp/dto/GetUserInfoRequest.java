package com.dear.letterservice.domain.stamp.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetUserInfoRequest {
	private UUID uuid;

	public static GetUserInfoRequest getUserInfoRequest(UUID uuid) {
		return GetUserInfoRequest.builder()
			.uuid(uuid)
			.build();
	}
}
