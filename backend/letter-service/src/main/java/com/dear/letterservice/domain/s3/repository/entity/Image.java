package com.dear.letterservice.domain.s3.repository.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id", nullable = false)
	private Long id;

	@Column(name = "url", nullable = false)
	private String url;

	@CreatedDate
	@Column(name = "create_at", updatable = false, nullable = false)
	private LocalDateTime createAt;

	public static Image image(String url, LocalDateTime createAt) {
		return Image.builder()
			.url(url)
			.createAt(createAt)
			.build();
	}
}
