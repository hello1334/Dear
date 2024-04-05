package com.dear.letterservice.domain.Test.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dear.letterservice.domain.letter.entity.Letter;
import com.dear.letterservice.domain.letter.repository.LetterRepository;
import com.dear.letterservice.domain.letterImage.entity.LetterImage;
import com.dear.letterservice.domain.letterImage.repository.LetterImageRepository;
import com.dear.letterservice.domain.letterMusic.entity.LetterMusic;
import com.dear.letterservice.domain.letterMusic.repository.LetterMusicRepository;
import com.dear.letterservice.domain.s3.repository.ImageRepository;
import com.dear.letterservice.domain.s3.repository.entity.Image;
import com.dear.letterservice.domain.stamp.entity.Stamp;
import com.dear.letterservice.domain.stamp.repository.StampRepository;
import com.dear.letterservice.global.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Transactional
@RequestMapping("/test")
public class TestController {
	private final JwtUtil jwtUtil;
	private final HttpServletRequest request;

	private final ImageRepository imageRepository;
	private final LetterImageRepository letterImageRepository;
	private final LetterMusicRepository letterMusicRepository;
	private final StampRepository stampRepository;
	private final LetterRepository letterRepository;

	@PostMapping("/insert-stamp-data")
	public void insertStampData() {
		UUID me = jwtUtil.extractUserId(request);
		List<Image> imageList = imageRepository.findAll();
		int cnt = 1;
		for (Image image: imageList) {
			if (cnt <= 6) {
				Stamp stamp = Stamp.stamp(me, UUID.randomUUID(), image);
				stampRepository.save(stamp);
				cnt++;
			}
			if (6 < cnt && cnt <= 10) {
//				Stamp stamp = Stamp.stamp(UUID.randomUUID(), me, image);
				Stamp stamp = Stamp.stamp(me, UUID.randomUUID(), image);
				stampRepository.save(stamp);
				cnt++;
			}
		}
	}

	@PostMapping("/insert-letter-data")
	public void insertLetterData() {
		List<Stamp> stampList = stampRepository.findAll();
		List<LetterMusic> letterMusicList = letterMusicRepository.findAll();
		List<LetterImage> letterImageList = letterImageRepository.findAll();

		for (int i = 0; i < 10; i++) {
			Letter letter = Letter.letter(false, LocalDateTime.now(), "fromUserName", "toUserName", stampList.get(i), letterMusicList.get(i), letterImageList.get(i));
			letterRepository.save(letter);
		}
	}
}
