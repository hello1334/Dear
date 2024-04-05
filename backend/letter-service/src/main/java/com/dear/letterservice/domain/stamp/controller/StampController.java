package com.dear.letterservice.domain.stamp.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dear.letterservice.domain.stamp.dto.GetStampDetailResponse;
import com.dear.letterservice.domain.stamp.dto.GetStampsListResponse;
import com.dear.letterservice.domain.stamp.dto.GetUnReadStampsListResponse;
import com.dear.letterservice.domain.stamp.service.StampService;
import com.dear.letterservice.global.dto.BaseResponse;
import com.dear.letterservice.global.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequestMapping("/stamps")
@RestController
@RequiredArgsConstructor
@Slf4j
public class StampController {
	private final JwtUtil jwtUtil;
	private final HttpServletRequest request;
	private final StampService stampService;

	// 우표 목록 조회
	@GetMapping("")
	public ResponseEntity<BaseResponse<GetStampsListResponse>> getStampsList(@RequestParam(value = "isDearMe") Boolean isDearMe) {
		UUID userId = jwtUtil.extractUserId(request);
		GetStampsListResponse getStampsListResponse = stampService.getStampsList(userId, isDearMe);
		return ResponseEntity.ok(BaseResponse.success(getStampsListResponse));
	}

	// 우표 및 편지 상세 조회
	@GetMapping("/{stampId}")
	public ResponseEntity<BaseResponse<GetStampDetailResponse>> getStampDetail(@PathVariable(value = "stampId") Long stampId) {
		GetStampDetailResponse getStampDetailResponse = stampService.getStampDetail(stampId);
		return ResponseEntity.ok(BaseResponse.success(getStampDetailResponse));
	}

	// 읽지 않은 우표 목록 조회
	@GetMapping("/unRead")
	public ResponseEntity<BaseResponse<List<GetUnReadStampsListResponse>>> getUnReadStampsList() {
		UUID userId = jwtUtil.extractUserId(request);
		List<GetUnReadStampsListResponse> list = stampService.getUnReadStampsList(userId);
		return ResponseEntity.ok((BaseResponse.success(list)));
	}

	// 읽지 않은 우표 읽음 처리
	@PostMapping("/{letterId}/read")
	public BaseResponse<Void> readLetter(@PathVariable(value = "letterId") Long letterId) {
		stampService.readLetter(letterId);
		return BaseResponse.success(null);
	}

	@PostMapping("/generate")
	public ResponseEntity<String> generateStamp(@RequestBody Map<String, String> map) {
		log.info("@@@@@@@@@");
		return ResponseEntity.ok(stampService.generateStamp(map.get("prompt")));
	}
}
