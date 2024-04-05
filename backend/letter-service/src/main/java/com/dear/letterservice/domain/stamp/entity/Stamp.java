package com.dear.letterservice.domain.stamp.entity;

import java.util.UUID;

import com.dear.letterservice.domain.s3.repository.entity.Image;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class Stamp {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "stamp_id", nullable = false)
	private Long id;

	@Column(name = "from_user_id", nullable = false)
	private UUID fromUserId;

	@Column(name = "to_user_id")
	private UUID toUserId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "image_id")
	private Image image;

	public static Stamp stamp(UUID user1, UUID user2, Image image) {
		return Stamp.builder()
			.fromUserId(user1)
			.toUserId(user2)
			.image(image)
			.build();
	}
}
