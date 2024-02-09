package com.chatappbackend.chapappbackend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tag extends  BaseDocument {
    @Transient
    public static final String SEQUENCE_NAME = "tags_sequence";
    @Id
    private long id;
    private String name;
    private String code;
}
