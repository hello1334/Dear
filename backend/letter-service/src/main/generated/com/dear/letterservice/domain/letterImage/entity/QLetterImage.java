package com.dear.letterservice.domain.letterImage.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLetterImage is a Querydsl query type for LetterImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLetterImage extends EntityPathBase<LetterImage> {

    private static final long serialVersionUID = 669894847L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLetterImage letterImage = new QLetterImage("letterImage");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.dear.letterservice.domain.s3.repository.entity.QImage image;

    public QLetterImage(String variable) {
        this(LetterImage.class, forVariable(variable), INITS);
    }

    public QLetterImage(Path<? extends LetterImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLetterImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLetterImage(PathMetadata metadata, PathInits inits) {
        this(LetterImage.class, metadata, inits);
    }

    public QLetterImage(Class<? extends LetterImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.image = inits.isInitialized("image") ? new com.dear.letterservice.domain.s3.repository.entity.QImage(forProperty("image")) : null;
    }

}

