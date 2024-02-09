package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.BlogLike;

import java.util.Map;

public interface BlogLikeService {
    Map<String,Object> countByBlogId(long blogId);

    String addLikeBlog(BlogLike blogLike);

    Map<String, Object> checkUserIsLike(long blogId, long userId);

    String cancelHeartDrop(long blogId, long userId);
}
