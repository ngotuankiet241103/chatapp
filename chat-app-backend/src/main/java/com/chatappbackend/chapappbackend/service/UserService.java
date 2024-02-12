package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.dto.UserDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.Pageable;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface UserService {
    boolean existsByEmail(String emails);

    void signUpUser(User userEntity, String token);

    void enableAppUser(String userId);

    User findById(long userId);
   

    UserDTO findByEmails(String emails);

    void activeTeached(long userId);

    Map<String,Object> findByRoleTutor(String name, String address, Pageable pageable) throws JsonProcessingException;

    Object updateUser(UserDTO userDTO,long id) throws ParseException;

    void updateStatus(String emails);

    List<UserDTO> findConnectedUsers();

    UserDTO findInfoByUser(long id);

    void updateStatusOffline(String emails);

    Object getTotalUserRegisterToday() throws ParseException;
}
