package com.chatappbackend.chapappbackend.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogRequest {
    @NotNull
    private String title;
    @NotNull
    private String content;
    @NotNull
    private String image;
    @NotNull
    private String categoryName;
    @NotNull
    private List<String> tagsName;
    private long userId;
}
