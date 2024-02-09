package com.chatappbackend.chapappbackend.document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {
    @Transient
    public static final String SEQUENCE_NAME = "messages_sequence";
    @Id
    private long id;
    private String chatId;
    private long senderId;
    private long recipientId;
    private String content;
    private Date timestamp;
}
