package com.chatappbackend.chapappbackend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatHistory {
    @Transient
    public static final String SEQUENCE_NAME = "chathistory_sequence";
    @Id
    private long id;
    private String chatId;
    private long senderId;
    private long recipientId;
    private Date date;
}
