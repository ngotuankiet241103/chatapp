package com.chatappbackend.chapappbackend.mapping.impl;

import com.chatappbackend.chapappbackend.document.Subject;
import com.chatappbackend.chapappbackend.dto.SubjectDTO;
import com.chatappbackend.chapappbackend.mapping.SubjectMapping;
import org.springframework.stereotype.Component;

@Component
public class SubjectMappingImpl implements SubjectMapping {
    @Override
    public SubjectDTO toDTO(Subject subject) {
        return new SubjectDTO(subject.getId(),subject.getName());
    }

    @Override
    public SubjectDTO toEntity(Subject subject) {
        return null;
    }
}
