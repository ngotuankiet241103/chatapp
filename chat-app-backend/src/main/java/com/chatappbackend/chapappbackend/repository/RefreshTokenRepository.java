package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken,Long> {
    @Query("{ $and: [ { 'isExpired' : false }, { 'token': ?0 } ] }")
    Optional<RefreshToken> findByToken(String refreshToken);
}
