package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.ProfileUser;
import com.chatappbackend.chapappbackend.dto.ProfileUserDTO;
import com.chatappbackend.chapappbackend.request.ProfileUserRequest;
import com.chatappbackend.chapappbackend.response.ResponseApi;

import java.util.Map;

public interface ProfileUserService {
    ResponseApi save(ProfileUserRequest profileUserRequest, long userId);

    ResponseApi findByUserId(long userId);
    ProfileUserDTO findProfileByUserId(long userId);

    ResponseApi updateProfile(ProfileUserRequest profileUserRequest, long userId);
}
