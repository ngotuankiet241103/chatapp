package com.chatappbackend.chapappbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface UserRedisService extends BaseRedisSerivice{
    Map<String, Object> getAllUser(Pageable pageable) throws JsonProcessingException;

    void saveAllUsers(Map<String, Object> response, Pageable pageable) throws JsonProcessingException;
}
