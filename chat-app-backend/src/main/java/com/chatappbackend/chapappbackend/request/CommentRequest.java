package com.chatappbackend.chapappbackend.request;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentRequest {
    @Id
    private long id;
    private String content;
    private long userId;
    private long blogId;
    private String tree_id;
    private long parentId;
    private int node_left;
    private int node_right;

}
