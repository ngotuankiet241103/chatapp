package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.Blog;
import com.chatappbackend.chapappbackend.document.BlogStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends MongoRepository<Blog,Long> {
    Page<Blog> findByStatus(BlogStatus status,Pageable pageable);
    @Query("{ 'id' : ?0 }")
    @Update("{ $set: { 'status' : ?1} }")
    void updateStatusApproved(long id, BlogStatus blogStatus);
    @Query("{ $and: [ { 'status' : ?0 }, { 'title': { $regex: ?1, $options: 'i' } } ] }")
    Page<Blog> findAllByStatus(Pageable pageable, BlogStatus blogStatus, String search);

    Optional<Blog> findByCode(String code);


    @Query("{ $and: [ { 'tagId' : ?0 },{ 'status' : ?1},  { 'title': { $regex: ?2 $options: 'i' } } ] }")
    Page<Blog> findAllByTagIdAndStatus(Pageable pageable, long id, BlogStatus blogStatus,String search);
    @Query("{ $and: [ { 'categoryId' : ?0 },{ 'status' : ?1},  { 'title': { $regex: ?2 $options: 'i' } } ] }")
    Page<Blog> findAllByCategoryIdAndStatus(Pageable pageable, long id, BlogStatus blogStatus,String search);

    Page<Blog> findAllByUserId(long userId, Pageable pageable);

    Page<Blog> findAllByUserIdAndStatus(long userId, BlogStatus blogStatus, Pageable pageable);
    @Query("{ $and: [ { 'categoryId' : ?0 },{ 'status' : ?1} ] }")
    Page<Blog> findAllByCategoryId(Pageable pageable, long id, BlogStatus blogStatus);
}
