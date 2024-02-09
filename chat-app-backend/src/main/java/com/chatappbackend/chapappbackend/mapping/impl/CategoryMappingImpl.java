package com.chatappbackend.chapappbackend.mapping.impl;

import com.chatappbackend.chapappbackend.document.Category;
import com.chatappbackend.chapappbackend.dto.CategoryDTO;
import com.chatappbackend.chapappbackend.mapping.CategoryMapping;
import com.chatappbackend.chapappbackend.mapping.ObjectMapping;
import org.springframework.stereotype.Component;

@Component
public class CategoryMappingImpl implements CategoryMapping {
    @Override
    public CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName(), category.getCode());
    }

    @Override
    public CategoryDTO toEntity(Category category) {
        return null;
    }
}
