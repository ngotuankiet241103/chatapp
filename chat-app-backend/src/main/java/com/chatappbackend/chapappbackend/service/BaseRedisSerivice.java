package com.chatappbackend.chapappbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Map;

public interface BaseRedisSerivice {
    void clear(String hash_key);
    Map<String,Object> getAll(String hash_key, Pageable pageable) throws JsonProcessingException;
    void saveAll(Map<String,Object> resposne, Pageable pageable,String hash_key) throws JsonProcessingException;
}
