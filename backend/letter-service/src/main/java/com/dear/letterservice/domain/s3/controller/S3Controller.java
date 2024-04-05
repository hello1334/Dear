package com.dear.letterservice.domain.s3.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.dear.letterservice.domain.s3.service.S3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/s3")
public class S3Controller {
	private final S3Service s3Service;

	@PostMapping("")
	public String uploadFile(@RequestParam(value = "file") MultipartFile file) {
		log.info("uploadFile !!!");
		return s3Service.uploadFile(file);
	}
}
