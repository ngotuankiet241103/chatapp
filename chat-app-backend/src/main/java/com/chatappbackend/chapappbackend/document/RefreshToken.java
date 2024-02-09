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
public class RefreshToken {
    @Transient
    public static final String SEQUENCE_NAME = "refreshTokens_sequence";
    @Id
    private long id;
    private String token;
    private boolean isExpired;
    private Date createDated;
    private Date expired;
}
