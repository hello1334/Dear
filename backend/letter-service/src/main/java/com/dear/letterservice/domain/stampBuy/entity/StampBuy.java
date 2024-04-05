package com.dear.letterservice.domain.stampBuy.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.annotation.CreatedDate;

import com.dear.letterservice.domain.stampDeal.entity.StampDeal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StampBuy {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "stamp_buy_id", nullable = false)
	private Long id;

	@CreatedDate
	@Column(name = "buy_at", updatable = false, nullable = false)
	private LocalDateTime buyAt;

	@Column(name = "user_id", nullable = false)
	private UUID userId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "stamp_deal_id")
	private StampDeal stampDeal;

	public static StampBuy stampBuy(LocalDateTime buyAt, UUID userId, StampDeal stampDeal) {
		return StampBuy.builder()
			.buyAt(buyAt)
			.userId(userId)
			.stampDeal(stampDeal)
			.build();
	}
}
