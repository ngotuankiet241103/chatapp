package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.ProfileUser;
import com.chatappbackend.chapappbackend.dto.ProfileUserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProfileRepository extends MongoRepository<ProfileUser,Long> {
    Optional<ProfileUser> findByUserId(long userId);
}
