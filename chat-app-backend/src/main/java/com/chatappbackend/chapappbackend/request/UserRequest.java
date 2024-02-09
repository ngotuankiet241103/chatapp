package com.chatappbackend.chapappbackend.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {
    @NotNull
    private String emails;
    @NotNull
    private String password;
}
