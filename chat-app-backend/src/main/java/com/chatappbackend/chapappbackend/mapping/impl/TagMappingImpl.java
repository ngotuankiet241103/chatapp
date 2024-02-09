package com.chatappbackend.chapappbackend.mapping.impl;

import com.chatappbackend.chapappbackend.document.Tag;
import com.chatappbackend.chapappbackend.dto.TagDTO;
import com.chatappbackend.chapappbackend.mapping.TagMapping;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class TagMappingImpl implements TagMapping {
    @Override
    public TagDTO toDTO(Tag tag) {
        return new TagDTO(tag.getId(), tag.getName(), tag.getCode());
    }

    @Override
    public TagDTO toEntity(Tag tag) {
        return null;
    }
}
