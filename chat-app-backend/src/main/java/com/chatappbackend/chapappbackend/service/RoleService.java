package com.chatappbackend.chapappbackend.service;


import com.chatappbackend.chapappbackend.document.Role;

public interface RoleService {
    Role findByName(String name);

    Role save(Role roleUser);

    Role findById(long roleId);
}
