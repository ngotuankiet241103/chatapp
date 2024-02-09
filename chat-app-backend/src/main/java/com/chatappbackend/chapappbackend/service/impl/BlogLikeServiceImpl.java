package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.Blog;
import com.chatappbackend.chapappbackend.document.BlogLike;
import com.chatappbackend.chapappbackend.repository.BlogLikeRepository;
import com.chatappbackend.chapappbackend.service.BlogLikeService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BlogLikeServiceImpl implements BlogLikeService {
    private final BlogLikeRepository blogLikeRepository;
    private final SequenceGeneratorService generatorService;
    @Override
    public Map<String, Object> countByBlogId(long blogId) {
        Map<String,Object> response = new HashMap<>();
        long totalLike = blogLikeRepository.countByBlogId(blogId);
        response.put("total",totalLike);
        return response;
    }

    @Override
    public String addLikeBlog(BlogLike blogLike) {
        blogLike.setId(generatorService.generateSequence(BlogLike.SEQUENCE_NAME));
        blogLikeRepository.save(blogLike);
        return "success";
    }

    @Override
    public Map<String, Object> checkUserIsLike(long blogId, long userId) {
        Map<String,Object> response = new HashMap<>();
        boolean check = blogLikeRepository.findByBlogIdAndUserId(blogId,userId).isPresent();
        response.put("isLike",check);
        return response;
    }
    @Transactional
    @Override
    public String cancelHeartDrop(long blogId, long userId) {
        BlogLike like = blogLikeRepository.findByBlogIdAndUserId(blogId,userId).orElse(null);
        if(like == null){
            return "undrop failed";
        }
        blogLikeRepository.deleteById(like.getId());
        return null;
    }
}
