package com.dear.letterservice.domain.letter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dear.letterservice.domain.letter.entity.Letter;
import com.dear.letterservice.domain.stamp.entity.Stamp;

public interface LetterRepository extends JpaRepository<Letter, Long> {
	Letter findByStamp(Stamp stamp);
}
