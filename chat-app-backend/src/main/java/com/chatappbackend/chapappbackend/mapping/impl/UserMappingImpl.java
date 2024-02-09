package com.chatappbackend.chapappbackend.mapping.impl;

import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.dto.UserDTO;
import com.chatappbackend.chapappbackend.mapping.UserMapping;
import com.chatappbackend.chapappbackend.utils.formatDate;
import org.springframework.stereotype.Component;

@Component
public class UserMappingImpl implements UserMapping {
    @Override
    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getEmails(), formatDate.formatDate(user.getDate()), user.getFullName(),user.getGender(), user.getAvatar(), user.getAddress(),user.getStatus(),user.isTeached());
    }

    @Override
    public UserDTO toEntity(User user) {
       return  null;
    }
}
