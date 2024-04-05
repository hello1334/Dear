package com.dear.letterservice.domain.letterImage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dear.letterservice.domain.letterImage.entity.LetterImage;

@Repository
public interface LetterImageRepository extends JpaRepository<LetterImage, Long> {
}
