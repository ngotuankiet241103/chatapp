package com.chatappbackend.chapappbackend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

@Document
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ConfirmationToken {
    @Transient
    public static final String SEQUENCE_NAME = "tokens_sequence";
    @Id
    private long id;
    private long userId;
    private String token;
    private LocalDateTime confirmedAt;
    private LocalDateTime expiresAt;
}
