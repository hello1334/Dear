package com.dear.letterservice.domain.letterMusic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dear.letterservice.domain.letterMusic.entity.LetterMusic;

@Repository
public interface LetterMusicRepository extends JpaRepository<LetterMusic, Long> {
}
