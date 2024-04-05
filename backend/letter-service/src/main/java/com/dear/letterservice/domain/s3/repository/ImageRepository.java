package com.dear.letterservice.domain.s3.repository;

import com.dear.letterservice.domain.s3.repository.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
