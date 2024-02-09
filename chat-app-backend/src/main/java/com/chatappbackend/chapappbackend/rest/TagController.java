package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.dto.TagDTO;
import com.chatappbackend.chapappbackend.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;
    @GetMapping("/tags")
    public List<TagDTO> getTags(){
        return tagService.findAll();
    }
}
