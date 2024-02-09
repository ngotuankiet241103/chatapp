package com.chatappbackend.chapappbackend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUser {
    @Transient
    public static final String SEQUENCE_NAME = "profileUsers_sequence";
    @Id
    private long id;
    private List<Long> subjectIds;
    private String introduce;
    private long userId;
}
