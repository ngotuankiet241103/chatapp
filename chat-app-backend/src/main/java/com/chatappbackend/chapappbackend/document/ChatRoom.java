package com.chatappbackend.chapappbackend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoom {
    @Transient
    public static final String SEQUENCE_NAME = "rooms_sequence";
    @Id
    private long id;
    private String chatId;
    private long senderId;
    private long recipientId;


}
