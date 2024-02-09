package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.document.BlogLike;
import com.chatappbackend.chapappbackend.service.BlogLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "localhost:3000", methods = {RequestMethod.DELETE})
public class BlogLikeController {
    private final BlogLikeService blogLikeService;
    @GetMapping("/blog/{blogId}/like")
    public Map<String,Object> getTotalLike(@PathVariable("blogId") long blogId){
        return blogLikeService.countByBlogId(blogId);
    }
    @GetMapping("/blog/{blogId}/like/{userId}")
    public Map<String,Object> checkUserIsLike(@PathVariable("blogId") long blogId,
                                              @PathVariable("userId") long userId){
        return blogLikeService.checkUserIsLike(blogId,userId);
    }
    @PostMapping("/blog/like")
    public String addLike(@RequestBody BlogLike blogLike){
        return blogLikeService.addLikeBlog(blogLike);
    }
    @CrossOrigin(origins = "http://127.0.0.1:3000")
    @PutMapping("/blog/{blogId}/like/{userId}")
    public String unheartDrop(@PathVariable("blogId") long blogId,
                              @PathVariable("userId") long userId) {
        return blogLikeService.cancelHeartDrop(blogId,userId);
    }

}
