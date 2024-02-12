package com.chatappbackend.chapappbackend.document;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
@Getter
@Setter
@NoArgsConstructor

public class BaseDocument {
    @CreatedDate
    protected Date createdDate;
    @CreatedBy
    protected String createdBy;
    @LastModifiedDate
    protected Date modifiedDate;
    @LastModifiedBy
    protected String modifiedBy;
}
