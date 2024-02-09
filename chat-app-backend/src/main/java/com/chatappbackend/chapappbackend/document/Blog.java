package com.chatappbackend.chapappbackend.document;

import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Blog extends  BaseDocument{
    @Transient
    public static final String SEQUENCE_NAME = "blogs_sequence";
    @Id
    private long id;
    private String image;
    private String title;
    private String code;
    private String content;
    private long categoryId;
    private List<Long> tagId;
    private long userId;
    private BlogStatus status;


}
