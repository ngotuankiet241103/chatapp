package com.chatappbackend.chapappbackend.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
@Getter
@Setter
public class ResponseError {
    private String status;
    private String error;
    private Timestamp timestamp;
}
