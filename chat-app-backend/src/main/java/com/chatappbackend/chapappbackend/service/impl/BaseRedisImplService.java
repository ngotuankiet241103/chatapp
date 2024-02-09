package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.service.BaseRedisSerivice;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Map;
import java.util.Set;
@RequiredArgsConstructor
public class BaseRedisImplService implements BaseRedisSerivice {
    protected final  RedisTemplate<String,Object> redisTemplate;
    protected final ObjectMapper redisObjectMapper;
    @Override
    public void clear(String hash_key) {
        Set<String> keysToDelete = redisTemplate.keys(hash_key + "*");

        if (keysToDelete != null && !keysToDelete.isEmpty()) {
            redisTemplate.delete(keysToDelete);
        }
    }

    @Override
    public Map<String, Object> getAll(String hash_key, Pageable pageable) throws JsonProcessingException {
        String key = getKey(pageable,hash_key);
        String json = (String) redisTemplate.opsForValue().get(key);
        Map<String,Object> response = json == null ? null : redisObjectMapper.readValue(json, new TypeReference<Map<String,Object>>() {
        });
        return response;
    }



    @Override
    public void saveAll(Map<String, Object> response, Pageable pageable,String hash_key) throws JsonProcessingException {
        String key = getKey(pageable,hash_key);
        String json = redisObjectMapper.writeValueAsString(response);
        redisTemplate.opsForValue().set(key,json);
    }

    public final String getKey(Pageable pageable,String HASH_KEY){
        int pageNumber = pageable.getPageNumber();
        int pageSize = pageable.getPageSize();
        Sort sort = pageable.getSort();
        String sortDirection = sort.getOrderFor("id")
                .getDirection() == Sort.Direction.ASC ? "asc" : "desc";
        String key = String.format(HASH_KEY + ":%d:%d:%s",pageNumber,pageSize,sortDirection);
        return key;
    }
}
