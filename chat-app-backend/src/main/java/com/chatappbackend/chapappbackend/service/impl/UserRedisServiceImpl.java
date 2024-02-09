package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.service.UserRedisService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
@Service

public class UserRedisServiceImpl extends BaseRedisImplService implements UserRedisService {

    private final static  String HASH_KEY = "all_users";

    public UserRedisServiceImpl(RedisTemplate<String, Object> redisTemplate, ObjectMapper redisObjectMapper) {
        super(redisTemplate, redisObjectMapper);
    }


    @Override
    public Map<String, Object> getAllUser(Pageable pageable) throws JsonProcessingException {
        return getAll(HASH_KEY,pageable);
    }

    @Override
    public void saveAllUsers(Map<String, Object> response, Pageable pageable) throws JsonProcessingException {
        saveAll(response,pageable,HASH_KEY);
    }
}
