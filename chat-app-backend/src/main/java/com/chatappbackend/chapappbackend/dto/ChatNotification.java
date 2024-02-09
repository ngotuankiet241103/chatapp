package com.chatappbackend.chapappbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChatNotification {
    private long id;
    private long senderId;

    private long recipientId;
    private String content;

}
