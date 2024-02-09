package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.Category;
import com.chatappbackend.chapappbackend.document.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TagRepository extends MongoRepository<Tag,Long> {
    Optional<Tag> findByName(String name);

    Optional<Tag> findByCode(String code);
}
