package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.BlogLike;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BlogLikeRepository extends MongoRepository<BlogLike,Long> {


    long countByBlogId(long blogId);

    Optional<BlogLike> findByBlogIdAndUserId(long blogId, long userId);
}
