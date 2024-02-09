package com.chatappbackend.chapappbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CommentDTO {
    private long id;
    private String content;
    private int node_left;
    private int node_right;
    private String tree_id;
    private long parent_id;
    private UserDTO user;
    private long blogId;


}
