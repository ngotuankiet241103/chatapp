package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment,Long> {
    List<Comment> findByBlogId(long blogId);

    @Query(value = "{ 'node_left' : { $gte: ?1 }, 'tree_id' : ?0}")
    @Update(value = "{ $inc: { node_left: 2 } }")
    void updateNodeLeft(String treeId, int nodeLeft);
    @Query(value = "{ 'node_right' : { $gte: ?1 }, 'tree_id' : ?0}")
    @Update(value = "{ $inc: { node_right: 2 } }")
    void updateNodeRight(String treeId, int nodeLeft);
}
