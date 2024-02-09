package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.request.CommentRequest;
import com.chatappbackend.chapappbackend.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @GetMapping("/comments/{blogId}")
    public Map<String,?> getCommentsByBlogId(@PathVariable("blogId") long blogId){
        return commentService.findByBlogId(blogId);
    }
    @PostMapping("/comment")
    public String addComment(@RequestBody CommentRequest comment){
        return commentService.save(comment);
    }
}
