package com.dear.letterservice.domain.letterMusic.controller;

import com.dear.letterservice.domain.letterMusic.service.LetterMusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/musics")
@RequiredArgsConstructor
public class LetterMusicController {

    private final LetterMusicService letterMusicService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateMusic(@RequestBody Map<String, String> map) {
        return ResponseEntity.ok(letterMusicService.generateMusic(map.get("title")));
    }

}
