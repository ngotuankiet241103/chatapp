package com.chatappbackend.chapappbackend.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ProfileUserRequest {
    private List<String> subjectsName;
    private String introduce;

}
