package com.dear.letterservice.domain.stampBuy.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStampBuy is a Querydsl query type for StampBuy
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStampBuy extends EntityPathBase<StampBuy> {

    private static final long serialVersionUID = 1535316543L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStampBuy stampBuy = new QStampBuy("stampBuy");

    public final DateTimePath<java.time.LocalDateTime> buyAt = createDateTime("buyAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.dear.letterservice.domain.stampDeal.entity.QStampDeal stampDeal;

    public final ComparablePath<java.util.UUID> userId = createComparable("userId", java.util.UUID.class);

    public QStampBuy(String variable) {
        this(StampBuy.class, forVariable(variable), INITS);
    }

    public QStampBuy(Path<? extends StampBuy> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStampBuy(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStampBuy(PathMetadata metadata, PathInits inits) {
        this(StampBuy.class, metadata, inits);
    }

    public QStampBuy(Class<? extends StampBuy> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.stampDeal = inits.isInitialized("stampDeal") ? new com.dear.letterservice.domain.stampDeal.entity.QStampDeal(forProperty("stampDeal"), inits.get("stampDeal")) : null;
    }

}

