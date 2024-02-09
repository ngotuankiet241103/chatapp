package com.chatappbackend.chapappbackend.auth;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public enum Role {
    USER(Collections.EMPTY_SET), ADMIN(Set.of(Permission.ADMIN_UPDATE, Permission.ADMIN_READ, Permission.ADMIN_DELETE, Permission.ADMIN_CREATE)),
    TUTOR(Set.of(Permission.MANAGER_READ, Permission.MANAGER_UPDATE, Permission.MANAGER_DELETE, Permission.MANAGER_CREATE))

    ;

    private final Set<Permission> permissions;

    public Set<Permission> getPermissions() {
        return permissions;
    }

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public static Role forName(String roleName) {
        if (roleName == null) {
            throw new IllegalArgumentException("Role name must not be null");
        }

        Role role = valueOf(roleName);
        if (role == null) {
            throw new IllegalArgumentException("Invalid role name: " + roleName);
        }

        return role;
    }

    public Set<SimpleGrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        System.out.println(Role.ADMIN.getPermissions());
        for (Permission permission : getPermissions()) {
            System.out.println(permission.getPermission());
            authorities.add(new SimpleGrantedAuthority(permission.getPermission()));
        }
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
