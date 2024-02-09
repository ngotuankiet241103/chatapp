package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SubjectRepository extends MongoRepository<Subject,Long> {
    Optional<Subject> findByName(String name);
}
