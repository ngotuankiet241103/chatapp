package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.Blog;
import com.chatappbackend.chapappbackend.document.BlogStatus;
import com.chatappbackend.chapappbackend.dto.BlogDTO;
import com.chatappbackend.chapappbackend.request.BlogRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface BlogService {
    Map<String,?> findAll(Pageable pageable, String search) throws JsonProcessingException;

    String save(BlogRequest blogRequest);

    Map<String,?> findByStatus(BlogStatus status,Pageable pageable);

    String approvedBlog(long id);

    Blog findById(long id);

    String rejectBlog(long id);

    BlogDTO findByCode(String code);

    Map<String,?> findAllByTopicCode(String code, Pageable pageable, String search) throws JsonProcessingException;

    Map<String,?> findAllByTagCode(String code, Pageable pageable, String search) throws JsonProcessingException;

    BlogDTO findBlogById(long id);

    Map<String,?> findAllByUserId(long userId, String status, Pageable pageable);

    String updateBlog(BlogRequest blogRequest, long id);

    Map<String,Object> findBlogRelatedByCategoryCode(String categoryCode);

    Map<String,?> getBlogCreated();
}
