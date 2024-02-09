package com.chatappbackend.chapappbackend.document;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
public class Subject {
    @Transient
    public static final String SEQUENCE_NAME = "subjects_sequence";
    @Id
    private long id;
    private String name;
}
