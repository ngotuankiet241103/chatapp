package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.request.ProfileUserRequest;
import com.chatappbackend.chapappbackend.service.ProfileUserService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ProfileUserController {
    private final ProfileUserService profileUserService;
    @GetMapping("/user-profile/{userId}")
    public  ResponseEntity<?> getProfileUser(@PathVariable("userId") long userId){
        return ResponseEntity.ok(profileUserService.findByUserId(userId));
    }
    @PostMapping("/user-profile/{userId}")
    public ResponseEntity<?> addProfileUser(@RequestBody ProfileUserRequest profileUserRequest, @PathVariable("userId") long userId){
        return  ResponseEntity.ok(profileUserService.save(profileUserRequest,userId));

    }
    @PutMapping("/user-profile/{userId}")
    public ResponseEntity<?>  editProfileUser(@RequestBody ProfileUserRequest profileUserRequest, @PathVariable("userId") long userId){
        return  ResponseEntity.ok(profileUserService.updateProfile(profileUserRequest,userId));

    }
}
