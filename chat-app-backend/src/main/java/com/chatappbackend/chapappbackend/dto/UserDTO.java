package com.chatappbackend.chapappbackend.dto;

import com.chatappbackend.chapappbackend.document.Status;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private long id;
    private String emails;
    private String date;
    private String roleName;
    private String fullName;
    private String avatar;
    private String address;
    private String gender;
    private ProfileUserDTO profileUser;
    private Status status;
    private boolean isTeached;
    public UserDTO(long id, String emails, String date, String fullName,String gender, String avatar, String address,Status status,boolean isTeached) {
        this.id = id;
        this.emails = emails;
        this.date = date;
        this.fullName = fullName;
        this.gender = gender;
        this.avatar = avatar;
        this.address = address;
        this.status = status;
        this.isTeached = isTeached;
    }


}
