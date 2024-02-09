package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.auth.AuthenticationResponse;
import com.chatappbackend.chapappbackend.auth.AuthenticationService;
import com.chatappbackend.chapappbackend.auth.RegisterService;
import com.chatappbackend.chapappbackend.request.RegisterRequest;
import com.chatappbackend.chapappbackend.request.UserRequest;
import com.chatappbackend.chapappbackend.response.ResponseApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final RegisterService registerService;
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody @Valid UserRequest userRequest){
        return ResponseEntity.ok(authenticationService.login(userRequest));
    }
    @PostMapping("/register")
    public AuthenticationResponse register(@RequestBody @Valid RegisterRequest registerRequest) throws ParseException {
        return registerService.register(registerRequest);
    }
    @GetMapping("/register/confirm")
    public String confirm(@RequestParam("token") String token) {
        registerService.confirmToken(token);

        return "update success";
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody AuthenticationResponse authenticationResponse){
        AuthenticationResponse response = authenticationService.refreshToken(authenticationResponse);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh Token hết hạn! ");
        }

        return ResponseEntity.ok(response);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody AuthenticationResponse authenticationResponse){
        ResponseApi response = authenticationService.logout(authenticationResponse);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("logout failed ");
        }
        return ResponseEntity.ok(response);
    }
}
