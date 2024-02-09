package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.dto.UserDTO;
import com.chatappbackend.chapappbackend.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/user")
    public ResponseEntity<?> getUserInfo(){
        String emails = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(userService.findByEmails(emails));
    }
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> findConnectedUsers() {
        return ResponseEntity.ok(userService.findConnectedUsers());
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable("id") long id) {
        return ResponseEntity.ok(userService.findInfoByUser(id));
    }
    @GetMapping("/tutors")
    public ResponseEntity<?> getTutors(
            @RequestParam(name= "province",defaultValue = "") String address,
            @RequestParam(name= "name",defaultValue = "") String name,
            @RequestParam(name = "page") int page,
            @RequestParam(name = "limit") int limit
    ) throws JsonProcessingException {
        Pageable pageable = PageRequest.of(page -1,limit, Sort.by("id").ascending());
        return ResponseEntity.ok(userService.findByRoleTutor(name,address,pageable));
    }
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateInfoUser(@RequestBody UserDTO userDTO,@PathVariable("id") long id) throws ParseException {
        return ResponseEntity.ok(userService.updateUser(userDTO,id));
    }
}
