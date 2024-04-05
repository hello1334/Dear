package com.dear.letterservice.domain.stampDeal.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStampDeal is a Querydsl query type for StampDeal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStampDeal extends EntityPathBase<StampDeal> {

    private static final long serialVersionUID = -705612417L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStampDeal stampDeal = new QStampDeal("stampDeal");

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Long> purchaseAmount = createNumber("purchaseAmount", Long.class);

    public final DateTimePath<java.time.LocalDateTime> registerAt = createDateTime("registerAt", java.time.LocalDateTime.class);

    public final com.dear.letterservice.domain.stamp.entity.QStamp stamp;

    public final StringPath title = createString("title");

    public QStampDeal(String variable) {
        this(StampDeal.class, forVariable(variable), INITS);
    }

    public QStampDeal(Path<? extends StampDeal> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStampDeal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStampDeal(PathMetadata metadata, PathInits inits) {
        this(StampDeal.class, metadata, inits);
    }

    public QStampDeal(Class<? extends StampDeal> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.stamp = inits.isInitialized("stamp") ? new com.dear.letterservice.domain.stamp.entity.QStamp(forProperty("stamp"), inits.get("stamp")) : null;
    }

}

