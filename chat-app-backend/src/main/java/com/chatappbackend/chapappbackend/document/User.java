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
public class User extends BaseDocument{
    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";
    @Id
    private long id;
    private String emails;
    private String password;
    private String fullName;
    private String avatar;
    private String address;
    private Date date;
    private String gender;
    private long roleId;
    private boolean isEnabled;
    private boolean isTeached;
    private Status status;

}
