package com.dear.letterservice.domain.letterMusic.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLetterMusic is a Querydsl query type for LetterMusic
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLetterMusic extends EntityPathBase<LetterMusic> {

    private static final long serialVersionUID = 689074303L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLetterMusic letterMusic = new QLetterMusic("letterMusic");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.dear.letterservice.domain.s3.repository.entity.QImage image;

    public final StringPath title = createString("title");

    public QLetterMusic(String variable) {
        this(LetterMusic.class, forVariable(variable), INITS);
    }

    public QLetterMusic(Path<? extends LetterMusic> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLetterMusic(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLetterMusic(PathMetadata metadata, PathInits inits) {
        this(LetterMusic.class, metadata, inits);
    }

    public QLetterMusic(Class<? extends LetterMusic> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.image = inits.isInitialized("image") ? new com.dear.letterservice.domain.s3.repository.entity.QImage(forProperty("image")) : null;
    }

}

