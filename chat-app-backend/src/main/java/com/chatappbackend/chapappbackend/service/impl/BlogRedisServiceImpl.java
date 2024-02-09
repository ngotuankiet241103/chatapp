package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.dto.BlogDTO;
import com.chatappbackend.chapappbackend.pagination.pageRequest;
import com.chatappbackend.chapappbackend.service.BlogRedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class BlogRedisServiceImpl extends BaseRedisImplService implements BlogRedisService {

    private final static String HASH_KEY = "all_blogs";

    public BlogRedisServiceImpl(RedisTemplate<String, Object> redisTemplate, ObjectMapper redisObjectMapper) {
        super(redisTemplate, redisObjectMapper);
    }


    @Override
    public void clear() {
        clear(HASH_KEY);
    }

    @Override
    public Map<String,Object> getAllBlogs(Pageable pageable, String search) throws JsonProcessingException {
       return getAll(HASH_KEY,pageable);
    }

    @Override
    public void saveAllBlogs(Map<String,Object> response, Pageable pagable, String search) throws JsonProcessingException {
        saveAll(response,pagable,HASH_KEY);

    }
    private String customKey(String value){
        return HASH_KEY + "_" + value;
    }
    @Override
    public Map<String, Object> getAllBlogsByTopicName(Pageable pageable, String code) throws JsonProcessingException {
        String customHashKey = customKey(code);
        return getAll(customHashKey,pageable);
    }

    @Override
    public void saveAllBlogsByTopicName(Map<String, Object> response,Pageable pageable, String code) throws JsonProcessingException {
        String customHashKey = customKey(code);
        saveAll(response,pageable,customHashKey);
    }

    @Override
    public Map<String, Object> getAllBlogsByTagCode(Pageable pageable, String code) throws JsonProcessingException {
        String customHashKey = customKey(code);
        return getAll(customHashKey,pageable);
    }

    @Override
    public void saveAllBlogsByTagName(Map<String, Object> response, Pageable pageable, String code) throws JsonProcessingException {
        String customHashKey = customKey(code);
        saveAll(response,pageable,customHashKey);
    }


}
