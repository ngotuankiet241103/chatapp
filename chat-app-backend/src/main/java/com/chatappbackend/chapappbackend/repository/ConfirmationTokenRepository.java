package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.ConfirmationToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.time.LocalDateTime;
import java.util.Optional;

public interface ConfirmationTokenRepository extends MongoRepository<ConfirmationToken,Long> {
    Optional<ConfirmationToken> findByToken(String token);

    @Query("{ 'token' : ?1 }")
    @Update("{ $set: { 'confirmedAt' : ?0 } }")
    void updateConfirmAtToken(LocalDateTime now, String token);
}
