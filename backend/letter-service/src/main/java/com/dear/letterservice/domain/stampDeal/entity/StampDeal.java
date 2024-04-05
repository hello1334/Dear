package com.dear.letterservice.domain.stampDeal.entity;

import java.time.LocalDateTime;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import com.dear.letterservice.domain.stamp.entity.Stamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StampDeal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "stamp_deal_id", nullable = false)
	private Long id;

	@Column(name = "price", nullable = false)
	private Integer price;

	@CreatedDate
	@Column(name = "register_at", updatable = false, nullable = false)
	private LocalDateTime registerAt;

	@Column(name = "purchase_amount", nullable = false)
	private Long purchaseAmount;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "title", nullable = false)
	private String title;

	@OneToOne
	@JoinColumn(name = "stamp_id")
	private Stamp stamp;
}
