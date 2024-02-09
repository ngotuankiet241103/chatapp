package com.chatappbackend.chapappbackend.mapping;

import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.dto.UserDTO;

public interface ObjectMapping<T,R>{
    R toDTO(T t);

    R toEntity(T t);
}
