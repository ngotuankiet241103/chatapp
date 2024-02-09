package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.Subject;
import com.chatappbackend.chapappbackend.dto.SubjectDTO;
import com.chatappbackend.chapappbackend.mapping.SubjectMapping;
import com.chatappbackend.chapappbackend.repository.SubjectRepository;
import com.chatappbackend.chapappbackend.response.ResponseApi;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import com.chatappbackend.chapappbackend.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    private final SubjectRepository subjectRepository;
    private final SequenceGeneratorService generatorService;
    private final SubjectMapping subjectMapping;
    @Override
    public Subject findByName(String name) {
        Optional<Subject> optional  = subjectRepository.findByName(name);
        return optional.orElseGet(() -> createSubject(name));
    }

    @Override
    public ResponseApi findByAll() {
        List<SubjectDTO> data =  subjectRepository.findAll().stream()
                                .map(subject -> subjectMapping.toDTO(subject))
                                .collect(Collectors.toList());
        ResponseApi responseApi = ResponseApi.builder()
                .status(HttpStatus.OK.toString())
                .message("get subjects success")
                .data(data)
                .build();
        return responseApi;
    }

    @Override
    public Subject findById(Long subjectId) {
        return subjectRepository.findById(subjectId).orElse(null);
    }

    private Subject createSubject(String name){
        Subject subject = new Subject();
        subject.setId(generatorService.generateSequence(Subject.SEQUENCE_NAME));
        subject.setName(name);
        return subjectRepository.save(subject);
    }
}
