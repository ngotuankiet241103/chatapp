package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category,Long> {
    Optional<Category> findByName(String code);

    Optional<Category> findByCode(String code);
}
