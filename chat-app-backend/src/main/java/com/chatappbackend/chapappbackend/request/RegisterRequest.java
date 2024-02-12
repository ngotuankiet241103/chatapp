package com.chatappbackend.chapappbackend.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotNull
    private String emails;
    @NotNull
    private String password;
    @NotNull
    private String gender;
    @NotNull
    private String fullName;
    @NotNull
    private String address;
    @NotNull
    private String avatar;
    @NotNull
    private String date;
    @NotNull
    private String role;

}
