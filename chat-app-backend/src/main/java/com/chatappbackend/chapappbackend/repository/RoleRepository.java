package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role,Long> {
    Role findByRoleName(String name);
}
