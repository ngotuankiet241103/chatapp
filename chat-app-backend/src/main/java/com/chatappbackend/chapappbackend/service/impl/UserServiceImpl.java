package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.auth.CustomUserDetails;
import com.chatappbackend.chapappbackend.document.*;
import com.chatappbackend.chapappbackend.dto.ProfileUserDTO;
import com.chatappbackend.chapappbackend.dto.UserDTO;
import com.chatappbackend.chapappbackend.mapping.ProfileMapping;
import com.chatappbackend.chapappbackend.mapping.UserMapping;
import com.chatappbackend.chapappbackend.pagination.pageRequest;
import com.chatappbackend.chapappbackend.repository.ProfileRepository;
import com.chatappbackend.chapappbackend.repository.UserRepository;
import com.chatappbackend.chapappbackend.service.*;
import com.chatappbackend.chapappbackend.utils.formatDate;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final ConfirmationTokenService tokenService;
    private final SequenceGeneratorService generatorService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapping userMapping;
    private final RoleService roleService;
    private final ProfileRepository profileRepository;
    private final SubjectService subjectService;
    private final ProfileMapping profileMapping;
    private final ChatHistoryService chatHistoryService;
    private final ChatRoomService chatRoomService;
    private final UserRedisService userRedisService;
    @Override
    public boolean existsByEmail(String emails) {
        return userRepository.existsByEmails(emails);
    }

    @Override
    public void signUpUser(User userEntity, String token) {
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        userRepository.save(userEntity);

        ConfirmationToken confirmationToken
                = ConfirmationToken.builder()
                .id(generatorService.generateSequence(ConfirmationToken.SEQUENCE_NAME))
                .token(token)
                .userId(userEntity.getId())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .build();
        tokenService.save(confirmationToken);
    }

    @Override
    public void enableAppUser(String userId) {
        userRepository.updateStatusUser(userId);
    }

    @Override
    public User findById(long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public UserDTO findByEmails(String emails) {

        return userRepository.findByEmails(emails).map(user -> {
            UserDTO userDTO = userMapping.toDTO(user);
            Role role = roleService.findById(user.getRoleId());
            userDTO.setRoleName(role.getRoleName());
            return userDTO;
        }).orElse(null);
    }

    @Override
    public void activeTeached(long userId) {
        userRepository.updateIsTeached(userId);
    }

    @Override
    public Map<String,Object> findByRoleTutor(String name, String address, Pageable pageable) throws JsonProcessingException {
        Map<String, Object> response = null;
        if(name.equals("")){
            response = userRedisService.getAllUser(pageable);
        }
        if(response == null){
            response = new HashMap<>();
            Page<User> page = userRepository.findByIsTeachedAdNameAdAdrr(name, address, pageable);
            List<UserDTO> userDTOS = new ArrayList<>();
            if (page.getContent().size() > 0){
                userDTOS = page.getContent().stream()
                        .map(user -> {
                            UserDTO userDTO = userMapping.toDTO(user);
                            ProfileUser profileUser = profileRepository.findByUserId(user.getId()).orElse(null);
                            ProfileUserDTO profileUserDTO = profileMapping.toDTO(profileUser);
                            List<String> subjects = profileUser.getSubjectIds().stream()
                                    .map(subjectId -> subjectService.findById(subjectId).getName())
                                    .collect(Collectors.toList());
                            profileUserDTO.setSubjects(subjects);
                            Role role = roleService.findById(user.getRoleId());
                            userDTO.setRoleName(role.getRoleName());
                            userDTO.setProfileUser(profileUserDTO);
                            return userDTO;
                        }).collect(Collectors.toList());
            }
            pageRequest pagination = new pageRequest(page.getNumber(),page.getTotalPages());

            response.put("tutors",userDTOS);
            response.put("pageable",pagination);
            userRedisService.saveAllUsers(response,pageable);
        }

        return response;
    }

    @Override
    public Object updateUser(UserDTO userDTO, long id) throws ParseException {
        User user = userRepository.findById(id).orElse(null);
        user.setAvatar(userDTO.getAvatar());
        user.setFullName(userDTO.getFullName());
        user.setDate(formatDate.convertString(userDTO.getDate()));
        user.setGender(userDTO.getGender());

        return userRepository.save(user);
    }

    @Override
    public void updateStatus(String emails) {
        userRepository.updateStatus(emails, Status.ONLINE);
    }

    @Override
    public List<UserDTO> findConnectedUsers() {
        CustomUserDetails user= (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = user.getUserId();
        List<ChatHistory> chatHistories = chatHistoryService.findByUserId(userId);
        List<ChatRoom> chatRooms = chatHistories.stream()
                                    .map(chatHistory ->
                                            chatRoomService.findByChatIdAndSenderId(chatHistory.getChatId(),userId))
                                    .collect(Collectors.toList());
        return chatRooms.stream().map(chatRoom -> {
            UserDTO userDTO = userMapping.toDTO(userRepository.findById(chatRoom.getRecipientId()).orElse(null));
            return userDTO;
        }).collect(Collectors.toList());
//        return userRepository.findAllByStatus(Status.ONLINE).stream()
//                .map(user -> {
//                    UserDTO userDTO = userMapping.toDTO(user);
//                    return userDTO;
//                }).collect(Collectors.toList());
    }

    @Override
    public UserDTO findInfoByUser(long id) {
        return userRepository.findById(id).map(user -> {
            UserDTO userDTO = userMapping.toDTO(user);
            return userDTO;
        }).orElse(new UserDTO());
    }

    @Override
    public void updateStatusOffline(String emails) {
        userRepository.updateStatus(emails, Status.OFFLINE);
    }

    @Override
    public Object getTotalUserRegisterToday() throws ParseException {
        Map<String,Integer> response = new HashMap<>();
        LocalDate localDate = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();;
        Date yesterday = Date.from(localDate.minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date tomorrow =  Date.from(localDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date previousMonth = Date.from(localDate.minusMonths(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        int totalDay = userRepository.findByDate(yesterday,tomorrow).size();
        int totayMonth = userRepository.findByDate(previousMonth,tomorrow).size();
        response.put("today", totalDay);
        response.put("month", totayMonth);
        return response;
    }
}
