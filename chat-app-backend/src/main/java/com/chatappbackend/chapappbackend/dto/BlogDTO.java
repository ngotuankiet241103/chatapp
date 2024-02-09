package com.chatappbackend.chapappbackend.dto;

import com.chatappbackend.chapappbackend.document.BlogStatus;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BlogDTO {
    private long id;
    private String image;
    private String title;
    private String code;
    private String content;
    private CategoryDTO category;
    private List<TagDTO> tags;
    private BlogStatus status;

}
