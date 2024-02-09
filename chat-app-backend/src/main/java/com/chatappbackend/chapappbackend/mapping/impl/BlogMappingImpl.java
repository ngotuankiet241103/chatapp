package com.chatappbackend.chapappbackend.mapping.impl;

import com.chatappbackend.chapappbackend.document.Blog;
import com.chatappbackend.chapappbackend.dto.BlogDTO;
import com.chatappbackend.chapappbackend.mapping.BlogMapping;
import com.chatappbackend.chapappbackend.mapping.CategoryMapping;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
@RequiredArgsConstructor
public class BlogMappingImpl implements BlogMapping {

    @Override
    public BlogDTO toDTO(Blog blog) {
        BlogDTO blogDTO = BlogDTO.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .code(blog.getCode())
                .image(blog.getImage())
                .content(blog.getContent())
                .status(blog.getStatus())
                .build();

        return blogDTO;
    }

    @Override
    public BlogDTO toEntity(Blog blog) {
        return null;
    }
}
