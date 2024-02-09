package com.chatappbackend.chapappbackend.mapping.impl;

import com.chatappbackend.chapappbackend.document.ProfileUser;
import com.chatappbackend.chapappbackend.dto.ProfileUserDTO;
import com.chatappbackend.chapappbackend.mapping.ProfileMapping;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class ProfileMappingImpl implements ProfileMapping {
    @Override
    public ProfileUserDTO toDTO(ProfileUser profileUser) {
        ProfileUserDTO profileUserDTO = new ProfileUserDTO();
        profileUserDTO.setIntroduce(profileUser.getIntroduce());
        return profileUserDTO;
    }

    @Override
    public ProfileUserDTO toEntity(ProfileUser profileUser) {
        return null;
    }
}
