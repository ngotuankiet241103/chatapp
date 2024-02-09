package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.Category;
import com.chatappbackend.chapappbackend.dto.CategoryDTO;
import com.chatappbackend.chapappbackend.mapping.CategoryMapping;
import com.chatappbackend.chapappbackend.repository.CategoryRepository;
import com.chatappbackend.chapappbackend.service.CategoryService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import com.chatappbackend.chapappbackend.utils.handleString;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final SequenceGeneratorService generatorService;
    private final CategoryMapping categoryMapping;
    @Override
    public Category findByName(String code) {
        return categoryRepository.findByName(code).orElseGet(() -> createCategory(code));
    }

    @Override
    public List<CategoryDTO> findAll() {
        return categoryRepository.findAll()
                .stream().map(category -> categoryMapping.toDTO(category))
                .collect(Collectors.toList());

    }

    @Override
    public Category findByCode(String code) {
        return categoryRepository.findByCode(code).orElse(new Category());
    }

    @Override
    public CategoryDTO findById(long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(new Category());
        return categoryMapping.toDTO(category);
    }

    private Category createCategory(String name) {
        Category category = Category.builder().id(generatorService.generateSequence(Category.SEQUENCE_NAME)).name(name).code(handleString.strToCode(name)).build();
        categoryRepository.save(category);
        return  category;
    }
}

