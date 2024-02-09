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
public class Comment extends BaseDocument {
    @Transient
    public static final String SEQUENCE_NAME = "comments_sequence";
    @Id
    private long id;
    private String content;
    private int node_left;
    private int node_right;
    private String tree_id;
    private long parent_id;
    private long userId;
    private long blogId;
}
