package com.dear.letterservice.domain.letter.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLetter is a Querydsl query type for Letter
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLetter extends EntityPathBase<Letter> {

    private static final long serialVersionUID = -1899948091L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLetter letter = new QLetter("letter");

    public final DateTimePath<java.time.LocalDateTime> createAt = createDateTime("createAt", java.time.LocalDateTime.class);

    public final StringPath fromUserName = createString("fromUserName");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.dear.letterservice.domain.letterImage.entity.QLetterImage letterImage;

    public final com.dear.letterservice.domain.letterMusic.entity.QLetterMusic letterMusic;

    public final BooleanPath readFlag = createBoolean("readFlag");

    public final com.dear.letterservice.domain.stamp.entity.QStamp stamp;

    public final StringPath toUserName = createString("toUserName");

    public QLetter(String variable) {
        this(Letter.class, forVariable(variable), INITS);
    }

    public QLetter(Path<? extends Letter> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLetter(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLetter(PathMetadata metadata, PathInits inits) {
        this(Letter.class, metadata, inits);
    }

    public QLetter(Class<? extends Letter> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.letterImage = inits.isInitialized("letterImage") ? new com.dear.letterservice.domain.letterImage.entity.QLetterImage(forProperty("letterImage"), inits.get("letterImage")) : null;
        this.letterMusic = inits.isInitialized("letterMusic") ? new com.dear.letterservice.domain.letterMusic.entity.QLetterMusic(forProperty("letterMusic"), inits.get("letterMusic")) : null;
        this.stamp = inits.isInitialized("stamp") ? new com.dear.letterservice.domain.stamp.entity.QStamp(forProperty("stamp"), inits.get("stamp")) : null;
    }

}

