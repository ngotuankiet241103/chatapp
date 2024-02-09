package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.Category;
import com.chatappbackend.chapappbackend.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    Category findByName(String code);

    List<CategoryDTO> findAll();

    Category findByCode(String code);

    CategoryDTO findById(long categoryId);
}
