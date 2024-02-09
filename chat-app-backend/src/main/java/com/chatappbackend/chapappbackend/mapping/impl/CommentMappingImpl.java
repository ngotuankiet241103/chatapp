package com.chatappbackend.chapappbackend.mapping.impl;

import com.chatappbackend.chapappbackend.document.Comment;
import com.chatappbackend.chapappbackend.dto.CommentDTO;
import com.chatappbackend.chapappbackend.mapping.CommentMapping;
import org.springframework.stereotype.Component;

@Component
public class CommentMappingImpl implements CommentMapping {
    @Override
    public CommentDTO toDTO(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .node_right(comment.getNode_right())
                .node_left(comment.getNode_left())
                .parent_id(comment.getParent_id())
                .tree_id(comment.getTree_id())
                .blogId(comment.getBlogId())
                .build();
    }

    @Override
    public CommentDTO toEntity(Comment comment) {
        return null;
    }
}
