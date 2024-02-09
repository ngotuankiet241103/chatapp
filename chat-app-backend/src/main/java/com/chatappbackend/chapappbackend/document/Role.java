package com.chatappbackend.chapappbackend.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role extends BaseDocument{
    @Transient
    public static final String SEQUENCE_NAME = "roles_sequence";
    @Id
    private long id;
    private String roleName;
    private boolean active;
}
