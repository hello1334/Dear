package com.dear.letterservice.domain.stamp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import com.dear.letterservice.domain.s3.repository.entity.Image;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.dear.letterservice.domain.letterImage.entity.LetterImage;
import com.dear.letterservice.domain.letterMusic.entity.LetterMusic;
import com.dear.letterservice.domain.stamp.dto.GetStampDetailResponse;
import com.dear.letterservice.domain.stamp.dto.GetStampsListResponse;
import com.dear.letterservice.domain.stamp.dto.GetStampsListStampResponse;
import com.dear.letterservice.domain.letter.entity.Letter;
import com.dear.letterservice.domain.letter.repository.LetterRepository;
import com.dear.letterservice.domain.stamp.dto.GetUnReadStampsListResponse;
import com.dear.letterservice.domain.stamp.dto.GetUserInfoRequest;
import com.dear.letterservice.domain.stamp.exception.StampException;
import com.dear.letterservice.domain.stamp.repository.StampRepository;
import com.dear.letterservice.domain.stamp.entity.Stamp;
import com.dear.letterservice.global.dto.ResponseCode;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Slf4j
@Transactional
public class StampService {
	private final StampRepository stampRepository;
	private final LetterRepository letterRepository;
	// private static final String USER_SERVER_API = "http://localhost:8020/users/userInfo";

	private final RestTemplate restTemplate = new RestTemplate();

	public GetStampsListResponse getStampsList(UUID userId, Boolean isDearMe) {
		int unReadLettersCnt = 0;
		List<GetStampsListStampResponse> stamps = new ArrayList<>();
		List<Stamp> stampList;

		// 보낸 편지 목록
		if (!isDearMe) {
			stampList = stampRepository.findByFromUserId(userId);
			for (Stamp stamp: stampList) {
				/*
					WebClient webClient = WebClient.create();
					GetUserInfoRequest getUserInfoRequest = GetUserInfoRequest.getUserInfoRequest(stamp.getToUserId());
					String toUserNickname = webClient.post()
						.uri(USER_SERVER_API)
						.contentType(MediaType.APPLICATION_JSON)
						.bodyValue(getUserInfoRequest)
						.retrieve()
						.bodyToMono(String.class)
						.block(); // 동기적으로 결과를 기다림
					// toUserNickname
					if (!Objects.equals(toUserNickname, nickname) && !Objects.equals(nickname, "")) continue;
				*/
					GetStampsListStampResponse s = GetStampsListStampResponse.getStampsListStampResponse(stamp.getId(), stamp.getImage().getUrl());
					stamps.add(s);
			}
		}

		// 받은 편지 목록
		if (isDearMe) {
			stampList = stampRepository.findByToUserId(userId);
			for (Stamp stamp: stampList) {
				/*
				WebClient webClient = WebClient.create();
				GetUserInfoRequest getUserInfoRequest = GetUserInfoRequest.getUserInfoRequest(stamp.getFromUserId());
				String fromUserNickname = webClient.post()
					.uri(USER_SERVER_API)
					.contentType(MediaType.APPLICATION_JSON)
					.bodyValue(getUserInfoRequest)
					.retrieve()
					.bodyToMono(String.class)
					.block(); // 동기적으로 결과를 기다림
				// fromUserNickname

				if (!Objects.equals(fromUserNickname, nickname) && !Objects.equals(nickname, "")) continue;
				*/
				Letter letter = letterRepository.findByStamp(stamp);
				if (letter.getReadFlag()) {
					GetStampsListStampResponse s = GetStampsListStampResponse.getStampsListStampResponse(stamp.getId(), stamp.getImage().getUrl());
					stamps.add(s);
				}
			}
		}

		// 안읽은 편지 개수
		stampList = stampRepository.findByToUserId(userId);
		for (Stamp stamp: stampList) {
			Letter letter = letterRepository.findByStamp(stamp);
			if (!letter.getReadFlag()) {
				unReadLettersCnt++;
			}
		}

		return GetStampsListResponse.getStampsResponse(unReadLettersCnt, stamps);
	}

	public GetStampDetailResponse getStampDetail(Long stampId) {
		Stamp stamp = stampRepository.findById(stampId).orElseThrow();
		Letter letter = letterRepository.findByStamp(stamp);
		String dear = letter.getToUserName();
		String from = letter.getFromUserName();
		/*LetterMusic letterMusic = letter.getLetterMusic();
		String musicUrl = letterMusic.getImage().getUrl();
		String musicTitle = letterMusic.getTitle();*/
		String musicUrl = null;
		String musicTitle = null;
		LetterImage letterImage = letter.getLetterImage();
		String letterUrl = letterImage.getImage().getUrl();
		LocalDateTime createAt = letter.getCreateAt();
		return GetStampDetailResponse.getStampDetailResponse(dear, from, musicUrl, musicTitle, letterUrl, createAt);
	}

	public List<GetUnReadStampsListResponse> getUnReadStampsList(UUID userId) {
		List<GetUnReadStampsListResponse> list = new ArrayList<>();

		// 받은 편지 목록
		List<Stamp> stampList = stampRepository.findByToUserId(userId);
		for (Stamp stamp: stampList) {
			Letter letter = letterRepository.findByStamp(stamp);
			// 안읽은 편지
			if (!letter.getReadFlag()) {
				Long letterId = letter.getId();
				String stampUrl = stamp.getImage().getUrl();
				String dear = letter.getToUserName();
				String from = letter.getFromUserName();
				/*LetterMusic letterMusic = letter.getLetterMusic();
				String musicUrl = letterMusic.getImage().getUrl();
				String musicTitle = letterMusic.getTitle();*/
				String musicUrl = null;
				String musicTitle = null;
				LetterImage letterImage = letter.getLetterImage();
				String letterUrl = letterImage.getImage().getUrl();
				LocalDateTime createAt = letter.getCreateAt();
				GetUnReadStampsListResponse getUnReadStampsListResponse = GetUnReadStampsListResponse.getUnReadStampsListResponse(
					letterId, stampUrl, dear, from, musicUrl, musicTitle, letterUrl, createAt
				);
				list.add(getUnReadStampsListResponse);
			}
		}

		return list;
	}

	public void readLetter(Long letterId) {
		Letter letter = letterRepository.findById(letterId).orElseThrow(
			() -> new StampException(ResponseCode.NO_LETTER));
		letter.updateReadFlag(Boolean.TRUE);
	}

	public Integer getCountByToUserId(UUID toUserId) {
		return stampRepository.countByToUserId(toUserId);
	}

	public Integer getCountByFromUserId(UUID fromUserId) {
		return stampRepository.countByFromUserId(fromUserId);
	}

	public Image getImage(Long stampId) {
        return stampRepository.findById(stampId).orElseThrow().getImage();
	}

	public String generateStamp(String prompt) {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		// Set request body
		String requestBody = "{\"prompt\": \"" + prompt + "\"}";

		// Create HttpEntity with headers and body
		HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

		String output = restTemplate.exchange("http://70.12.247.56:8080/generate-stamp", HttpMethod.POST, entity, String.class).getBody();
		log.info("output = {}", output);
		return output;
	}
}
