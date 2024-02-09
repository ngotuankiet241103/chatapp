package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.dto.BlogDTO;
import com.chatappbackend.chapappbackend.pagination.pageRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface BlogRedisService extends BaseRedisSerivice {
    void clear();

    Map<String,Object> getAllBlogs(Pageable pageable, String search) throws JsonProcessingException;

    void saveAllBlogs(Map<String,Object> respone, Pageable pagable, String search) throws JsonProcessingException;

    Map<String, Object> getAllBlogsByTopicName(Pageable pageable, String code) throws JsonProcessingException;

    void saveAllBlogsByTopicName(Map<String, Object> response,Pageable pageable, String code) throws JsonProcessingException;

    Map<String, Object> getAllBlogsByTagCode(Pageable pageable, String code) throws JsonProcessingException;

    void saveAllBlogsByTagName(Map<String, Object> response, Pageable pageable, String code) throws JsonProcessingException;
}
