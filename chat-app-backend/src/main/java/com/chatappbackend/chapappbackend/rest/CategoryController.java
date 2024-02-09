package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.dto.CategoryDTO;
import com.chatappbackend.chapappbackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping("/categories")
    public List<CategoryDTO> getCategories(){
        return categoryService.findAll();
    }
}
