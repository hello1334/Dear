package com.dear.userservice.domain.user.dto.req;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetUserInfoReqDto {
	private UUID uuid;
}
