package com.dear.userservice.domain.user.dto.res;

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
public class GetUserInfoResDto {
	private String nickname;
	private String email;

	public static GetUserInfoResDto getUserInfoResDto(String nickname, String email) {
		return GetUserInfoResDto.builder()
			.nickname(nickname)
			.email(email)
			.build();
	}
}
