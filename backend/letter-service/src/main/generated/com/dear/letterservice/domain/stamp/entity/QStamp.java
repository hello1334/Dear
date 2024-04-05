package com.dear.letterservice.domain.stamp.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStamp is a Querydsl query type for Stamp
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStamp extends EntityPathBase<Stamp> {

    private static final long serialVersionUID = 2035910655L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStamp stamp = new QStamp("stamp");

    public final ComparablePath<java.util.UUID> fromUserId = createComparable("fromUserId", java.util.UUID.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.dear.letterservice.domain.s3.repository.entity.QImage image;

    public final ComparablePath<java.util.UUID> toUserId = createComparable("toUserId", java.util.UUID.class);

    public QStamp(String variable) {
        this(Stamp.class, forVariable(variable), INITS);
    }

    public QStamp(Path<? extends Stamp> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStamp(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStamp(PathMetadata metadata, PathInits inits) {
        this(Stamp.class, metadata, inits);
    }

    public QStamp(Class<? extends Stamp> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.image = inits.isInitialized("image") ? new com.dear.letterservice.domain.s3.repository.entity.QImage(forProperty("image")) : null;
    }

}

