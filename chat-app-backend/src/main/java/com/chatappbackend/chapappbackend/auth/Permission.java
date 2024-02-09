package com.chatappbackend.chapappbackend.auth;

public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    MANAGER_READ("management:read"),
    MANAGER_UPDATE("management:update"),
    MANAGER_CREATE("management:create"),
    MANAGER_DELETE("management:delete")
    ;
    private Permission(String permission) {
        this.permission = permission;
    }


    public String getPermission() {
        return permission;
    }


    private final String permission;
}
