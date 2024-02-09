package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.Tag;
import com.chatappbackend.chapappbackend.dto.TagDTO;
import com.chatappbackend.chapappbackend.mapping.TagMapping;
import com.chatappbackend.chapappbackend.repository.TagRepository;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import com.chatappbackend.chapappbackend.service.TagService;
import com.chatappbackend.chapappbackend.utils.handleString;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;
    private final  SequenceGeneratorService generatorService;
    private final TagMapping tagMapping;
    @Override
    public Tag findByName(String name) {
        return tagRepository.findByName(name).orElseGet(() -> createTag(name));
    }

    @Override
    public List<TagDTO> findAll() {
        return tagRepository.findAll().stream()
                .map(tag -> tagMapping.toDTO(tag))
                .collect(Collectors.toList());
    }

    @Override
    public Tag findByCode(String code) {
        return tagRepository.findByCode(code).orElse(new Tag());
    }

    @Override
    public List<TagDTO> findByIds(List<Long> tagId) {
        List<Tag> tags = tagId.stream()
                    .map(id -> tagRepository.findById(id).orElse(new Tag()))
                    .collect(Collectors.toList());
        return tags.stream()
                .map(tag -> tagMapping.toDTO(tag))
                .collect(Collectors.toList());
    }

    private Tag createTag(String name){
        Tag tag = Tag.builder()
                .id(generatorService.generateSequence(Tag.SEQUENCE_NAME))
                .name(name)
                .code(handleString.strToCode(name))
                .build();
        tagRepository.save(tag);
        return  tag;
    }
}
