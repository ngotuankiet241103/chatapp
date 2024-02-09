package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.response.ResponseApi;
import com.chatappbackend.chapappbackend.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class SubjectController {
    private final SubjectService subjectService;
    @GetMapping("/subjects")
    public ResponseEntity<ResponseApi> getSubjects(){
        return ResponseEntity.ok(subjectService.findByAll());
    }
}
