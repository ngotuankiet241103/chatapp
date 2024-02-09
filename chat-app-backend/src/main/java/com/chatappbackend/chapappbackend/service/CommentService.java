package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.Comment;
import com.chatappbackend.chapappbackend.dto.CommentDTO;
import com.chatappbackend.chapappbackend.request.CommentRequest;

import java.util.List;
import java.util.Map;

public interface CommentService {
    Map<String, List<CommentDTO>> findByBlogId(long blogId);

    String save(CommentRequest comment);
}
