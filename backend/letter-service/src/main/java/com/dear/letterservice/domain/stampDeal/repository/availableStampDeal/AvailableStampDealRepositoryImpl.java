package com.dear.letterservice.domain.stampDeal.repository.availableStampDeal;

import com.dear.letterservice.domain.stampDeal.dto.GetAvailableSellStampResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.dear.letterservice.domain.stamp.entity.QStamp.stamp;
import static com.dear.letterservice.domain.stampDeal.entity.QStampDeal.stampDeal;

@Repository
@RequiredArgsConstructor
public class AvailableStampDealRepositoryImpl implements AvailableStampDealRepository {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<GetAvailableSellStampResponse> findStampDealByUserId(UUID userId) {
        return jpaQueryFactory.select(Projections.bean(GetAvailableSellStampResponse.class,
                        stamp.id, stamp.image.url))
                .from(stamp)
                .leftJoin(stampDeal)
                .on(stamp.id.eq(stampDeal.stamp.id))
                .where(stamp.fromUserId.eq(userId).and(stampDeal.id.isNull()))
                .fetch();
    }
}
