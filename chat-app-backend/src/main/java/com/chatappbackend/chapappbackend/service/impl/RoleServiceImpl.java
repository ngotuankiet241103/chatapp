package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.Role;
import com.chatappbackend.chapappbackend.repository.RoleRepository;
import com.chatappbackend.chapappbackend.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository repository;
    @Override
    public Role findByName(String name) {
        return repository.findByRoleName(name);
    }

    @Override
    public Role save(Role roleUser) {
        return repository.save(roleUser);
    }

    @Override
    public Role findById(long roleId) {
        return repository.findById(roleId).orElseThrow(() -> new RuntimeException("role is not found"));
    }
}
