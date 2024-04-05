package com.dear.letterservice.domain.letter.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.dear.letterservice.domain.letterImage.entity.LetterImage;
import com.dear.letterservice.domain.letterMusic.entity.LetterMusic;
import com.dear.letterservice.domain.stamp.entity.Stamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Letter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "letter_id", nullable = false)
	private Long id;

	@Column(name = "read_flag", nullable = false)
	private Boolean readFlag;

	@CreatedDate
	@Column(name = "create_at", updatable = false, nullable = false)
	private LocalDateTime createAt;

	@Column(name = "from_user_name", nullable = false)
	private String fromUserName;

	@Column(name = "to_user_name", nullable = false)
	private String toUserName;

	@OneToOne
	@JoinColumn(name = "stamp_id")
	private Stamp stamp;

	@OneToOne
	@JoinColumn(name = "letter_music_id")
	private LetterMusic letterMusic;

	@OneToOne
	@JoinColumn(name = "letter_image_id")
	private LetterImage letterImage;

	public void updateReadFlag(Boolean flag) {
		this.readFlag = flag;
	}

	public static Letter letter(Boolean readFlag, LocalDateTime createAt,
		String fromUserName, String toUserName, Stamp stamp,
		LetterMusic letterMusic, LetterImage letterImage) {
		return Letter.builder()
			.readFlag(readFlag)
			.createAt(createAt)
			.fromUserName(fromUserName)
			.toUserName(toUserName)
			.stamp(stamp)
			.letterMusic(letterMusic)
			.letterImage(letterImage)
			.build();
	}
}
