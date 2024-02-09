package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.Subject;
import com.chatappbackend.chapappbackend.response.ResponseApi;

public interface SubjectService {
    Subject findByName(String name);

    ResponseApi findByAll();

    Subject findById(Long subjectId);
}
