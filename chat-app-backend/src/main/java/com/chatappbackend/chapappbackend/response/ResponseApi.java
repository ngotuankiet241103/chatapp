package com.chatappbackend.chapappbackend.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseApi {
    private String status;
    private String message;
    private Object data;
}
