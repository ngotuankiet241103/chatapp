package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.ProfileUser;
import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.dto.ProfileUserDTO;
import com.chatappbackend.chapappbackend.dto.UserDTO;
import com.chatappbackend.chapappbackend.mapping.ProfileMapping;
import com.chatappbackend.chapappbackend.mapping.UserMapping;
import com.chatappbackend.chapappbackend.repository.ProfileRepository;
import com.chatappbackend.chapappbackend.request.ProfileUserRequest;
import com.chatappbackend.chapappbackend.response.ResponseApi;
import com.chatappbackend.chapappbackend.service.ProfileUserService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import com.chatappbackend.chapappbackend.service.SubjectService;
import com.chatappbackend.chapappbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProfileUserServiceImpl implements ProfileUserService {
    private final ProfileRepository profileRepository;
    private final SubjectService subjectService;
    private final SequenceGeneratorService generatorService;
    private final UserService userService;
    private final ProfileMapping profileMapping;
    private final UserMapping userMapping;
    @Override
    public ResponseApi save(ProfileUserRequest profileUserRequest, long userId) {
        List<Long> subjectIds = findSubjects(profileUserRequest.getSubjectsName());
        ProfileUser profileUser = ProfileUser.builder()
                .id(generatorService.generateSequence(ProfileUser.SEQUENCE_NAME))
                .introduce(profileUserRequest.getIntroduce())
                .subjectIds(subjectIds)
                .userId(userId)
                .build();
        profileRepository.save(profileUser);
        userService.activeTeached(userId);
        ResponseApi response = ResponseApi.builder()
                .status(HttpStatus.CREATED.toString())
                .message("add profile user success")
                            .build();
        return response;
    }

    @Override
    public ResponseApi findByUserId(long userId) {
        UserDTO userDTO = queryByUserId(userId);
        return ResponseApi.builder()
                .status(HttpStatus.OK.toString())
                .message("get info tutor success")
                .data(userDTO)
                .build();
    }
    private UserDTO queryByUserId(long userId){
        User user = userService.findById(userId);
        ProfileUser profileUser = profileRepository.findByUserId(userId).orElse(null);
        ProfileUserDTO profileUserDTO = profileMapping.toDTO(profileUser);
        List<String> subjects =  profileUser.getSubjectIds().stream()
                .map(subjectId -> subjectService.findById(subjectId).getName()).collect(Collectors.toList());
        profileUserDTO.setSubjects(subjects);
        UserDTO userDTO = userMapping.toDTO(user);
        userDTO.setProfileUser(profileUserDTO);
        return userDTO;
    }
    @Override
    public ProfileUserDTO findProfileByUserId(long userId) {
        ProfileUser profileUser = profileRepository.findByUserId(userId).orElse(null);
        ProfileUserDTO profileUserDTO = profileMapping.toDTO(profileUser);
        List<String> subjects =  profileUser.getSubjectIds().stream()
                .map(subjectId -> subjectService.findById(subjectId).getName()).collect(Collectors.toList());
        profileUserDTO.setSubjects(subjects);
        return profileUserDTO;
    }

    @Override
    public ResponseApi updateProfile(ProfileUserRequest profileUserRequest, long userId) {
        ProfileUser profileUser = profileRepository.findByUserId(userId).orElse(new ProfileUser());
        List<Long> subjectIds = findSubjects(profileUserRequest.getSubjectsName());
        profileUser.setIntroduce(profileUserRequest.getIntroduce());
        profileUser.setSubjectIds(subjectIds);
        profileRepository.save(profileUser);
        ResponseApi responseApi = ResponseApi.builder()
                .data(HttpStatus.OK.toString())
                .message("update profile success")
                .data(new HashMap<>())
                .build();
        return responseApi;
    }


    private List<Long> findSubjects(List<String> subjectsName){
        return subjectsName
                        .stream()
                        .map(name -> subjectService.findByName(name).getId())
                        .collect(Collectors.toList());
    }
}
