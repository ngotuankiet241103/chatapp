package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.Category;
import com.chatappbackend.chapappbackend.document.Tag;
import com.chatappbackend.chapappbackend.dto.TagDTO;

import java.util.List;

public interface TagService {
    Tag findByName(String name);

    List<TagDTO> findAll();

    Tag findByCode(String code);

    List<TagDTO> findByIds(List<Long> tagId);
}
