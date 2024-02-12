package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.Status;
import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,Long> {
    Optional<User> findByEmails(String email);

    boolean existsByEmails(String emails);
    @Query("{ 'emails' : ?0 }")
    @Update("{ $set: { 'isEnabled' : true } }")
    void updateStatusUser(String userId);
    @Query("{ 'id' : ?0 }")
    @Update("{ $set: { 'isTeached' : true } }")
    void updateIsTeached(long userId);
    @Query("{ 'isTeached' : true }")
    List<User> findByIsTeached();
    @Query("{ 'emails' : ?0 }")
    @Update("{ $set: { 'status' : ?1 } }")
    void updateStatus(String emails, Status status);
    List<User> findAllByStatus(Status status);
    @Query("{ $and: [ { 'isTeached' : true }, { 'fullName': { $regex: ?0, $options: 'i' } }, { 'address': { $regex: ?1, $options: 'i' } } ] }")

    Page<User> findByIsTeachedAdNameAdAdrr(String name, String address, Pageable pageable);
    @Query("{ $and: [ { 'createdDate' : { $gt: ?0 } }, { 'createdDate' : { $lt: ?1 } }] }")
    List<User> findByDate(Date yesterday, Date tomorrow);
}
