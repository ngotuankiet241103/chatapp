package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.auth.CustomUserDetails;
import com.chatappbackend.chapappbackend.document.Blog;
import com.chatappbackend.chapappbackend.document.BlogStatus;
import com.chatappbackend.chapappbackend.document.Category;
import com.chatappbackend.chapappbackend.document.Tag;
import com.chatappbackend.chapappbackend.dto.BlogDTO;
import com.chatappbackend.chapappbackend.dto.CategoryDTO;
import com.chatappbackend.chapappbackend.dto.TagDTO;
import com.chatappbackend.chapappbackend.mapping.BlogMapping;
import com.chatappbackend.chapappbackend.mapping.CategoryMapping;
import com.chatappbackend.chapappbackend.mapping.TagMapping;
import com.chatappbackend.chapappbackend.pagination.pageRequest;
import com.chatappbackend.chapappbackend.repository.BlogRepository;
import com.chatappbackend.chapappbackend.request.BlogRequest;
import com.chatappbackend.chapappbackend.service.*;
import com.chatappbackend.chapappbackend.utils.handleString;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {
    private final BlogRepository blogRepository;
    private final CategoryService categoryService;
    private final TagService tagService;
    private final SequenceGeneratorService generatorService;
    private final BlogMapping blogMapping;
    private final CategoryMapping categoryMapping;
    private final TagMapping tagMapping;
    private final BlogRedisService blogRedisService;
    @Override
    public Map<String, ?> findAll(Pageable pageable, String search) throws JsonProcessingException {
        Map<String, Object> response = null;
        if(search.equals("")){
            response = blogRedisService.getAllBlogs(pageable,search);
        }

        if(response == null){
            response = new HashMap<>();
            Page<Blog> page = blogRepository.findAllByStatus(pageable,BlogStatus.APPROVED,search);
            pageRequest pagination = new pageRequest(page.getNumber(),page.getTotalPages());
            List<BlogDTO> blogs = new ArrayList<>();
            if(page.getContent().size() > 0){
                blogs = mappingList(page.getContent());
            }
            response.put("blogs",blogs);
            response.put("pagination",pagination);
            blogRedisService.saveAllBlogs(response,pageable,search);

        }

        return response;
    }
    private List<BlogDTO> mappingList(List<Blog> blogs){
        List<BlogDTO> response = blogs.stream()
                .map(blog -> mapDetailBlog(blog))
                .collect(Collectors.toList());
        return response;
    }
    private BlogDTO mapDetailBlog(Blog blog){
        BlogDTO blogDTO = blogMapping.toDTO(blog);
        CategoryDTO categoryDTO = categoryService.findById(blog.getCategoryId());
        List<TagDTO> tagDTOS = tagService.findByIds(blog.getTagId());
        blogDTO.setCategory(categoryDTO);
        blogDTO.setTags(tagDTOS);
        return blogDTO;
    }
    @Override
    public String save(BlogRequest blogRequest) {
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        long userId = customUserDetails.getUserId();
        Category category = categoryService.findByName(blogRequest.getCategoryName());
        List<Tag> tags = blogRequest.getTagsName().stream()
                        .map(tagName -> tagService.findByName(tagName))
                        .collect(Collectors.toList());

        Blog blog = Blog.builder()
                    .id(generatorService.generateSequence(Blog.SEQUENCE_NAME))
                    .title(blogRequest.getTitle())
                    .code(handleString.strToCode(blogRequest.getTitle()))
                    .image(blogRequest.getImage())
                    .status(BlogStatus.PENDING)
                    .content(blogRequest.getContent())
                    .categoryId(category.getId())
                    .tagId(tags.stream().map(Tag::getId).collect(Collectors.toList()))
                    .userId(userId)
                    .build();

        blogRepository.save(blog);
        blogRedisService.clear();
        System.out.println(blog.getCreatedDate());
        System.out.println(blog.getModifiedDate());
        return "sucess";
    }

    @Override
    public Map<String, ?> findByStatus(BlogStatus status,Pageable pageable) {
        Map<String,Object> response = new HashMap<>();
        Page<Blog> page = blogRepository.findByStatus(status,pageable);
        List<BlogDTO> blogs = new ArrayList<>();
        pageRequest pagination = new pageRequest(page.getNumber(),page.getTotalPages());
        if(page.getContent().size() > 0){
            blogs = mappingList(page.getContent());
        }
        response.put("blogs",blogs);
        response.put("pagination",pagination);
        return response;
    }

    @Override
    public String approvedBlog(long id) {
        blogRepository.updateStatusApproved(id,BlogStatus.APPROVED);
        blogRedisService.clear();
        return "success";
    }

    @Override
    public Blog findById(long id) {
        return blogRepository.findById(id).orElse(new Blog());
    }

    @Override
    public String rejectBlog(long id) {
        blogRepository.updateStatusApproved(id,BlogStatus.REJECT);
        blogRedisService.clear();
        return "success";
    }

    @Override
    public BlogDTO findByCode(String code) {
        BlogDTO blogDTO = blogRepository.findByCode(code).map(blog -> mapDetailBlog(blog))
                .orElse(new BlogDTO());
        return blogDTO;
    }

    @Override
    public Map<String, ?> findAllByTopicCode(String code, Pageable pageable, String search) throws JsonProcessingException {
        Map<String, Object> response = null;
        if(search.equals("")) {
            response = blogRedisService.getAllBlogsByTopicName(pageable, code);
        }
        if(response == null){
            response = new HashMap<>();
            Category category = categoryService.findByCode(code);
            Page<Blog> page = blogRepository.findAllByCategoryIdAndStatus(pageable,category.getId(),BlogStatus.APPROVED,search);
            pageRequest pagable = new pageRequest(page.getNumber(),page.getTotalPages());
            List<BlogDTO> blogs = new ArrayList<>();
            if(page.getContent().size() > 0){
                blogs = mappingList(page.getContent());
            }
            response.put("blogs",blogs);
            response.put("pagination",pagable);
            blogRedisService.saveAllBlogsByTopicName(response,pageable,code);
        }
        return response;
    }

    @Override
    public Map<String, ?> findAllByTagCode(String code, Pageable pageable, String search) throws JsonProcessingException {
        Map<String, Object> response = null;
        if(search.equals("")){
            response = blogRedisService.getAllBlogsByTagCode(pageable,code);
        }

        if(response == null){
            response = new HashMap<>();
            Tag category = tagService.findByCode(code);
            Page<Blog> page = blogRepository.findAllByTagIdAndStatus(pageable,category.getId(),BlogStatus.APPROVED,search);
            pageRequest pagable = new pageRequest(page.getNumber(),page.getTotalPages());
            List<BlogDTO> blogs = new ArrayList<>();
            if(page.getContent().size() > 0){
                blogs = mappingList(page.getContent());
            }

            response.put("blogs",blogs);
            response.put("pagination",pagable);
            blogRedisService.saveAllBlogsByTagName(response,pageable,code);
        }

        return response;
    }

    @Override
    public BlogDTO findBlogById(long id) {
        BlogDTO blogDTO = blogRepository.findById(id).map(blog -> mapDetailBlog(blog)).orElse(new BlogDTO());
        return blogDTO;
    }

    @Override
    public Map<String, ?> findAllByUserId(long userId, String status, Pageable pageable) {
        BlogStatus blogStatus = getBlogStatus(status);
        Map<String, Object> response = new HashMap<>();
        Page<Blog> page = null;
        if(blogStatus != null){
            page = blogRepository.findAllByUserIdAndStatus(userId,blogStatus,pageable);
        }
        else{
           page = blogRepository.findAllByUserId(userId,pageable);
        }

        pageRequest pagable = new pageRequest(page.getNumber(),page.getTotalPages());
        List<BlogDTO> blogs = new ArrayList<>();
        if(page.getContent().size() > 0){
            blogs = mappingList(page.getContent());
        }
        response.put("blogs",blogs);
        response.put("pagination",pagable);
        return response;
    }

    @Override
    public String updateBlog(BlogRequest blogRequest, long id) {
        Category category = categoryService.findByName(blogRequest.getCategoryName());
        List<Tag> tags = blogRequest.getTagsName().stream()
                .map(tagName -> tagService.findByName(tagName))
                .collect(Collectors.toList());

        Blog blog = Blog.builder()
                .id(id)
                .title(blogRequest.getTitle())
                .code(handleString.strToCode(blogRequest.getTitle()))
                .image(blogRequest.getImage())
                .status(BlogStatus.APPROVED)
                .content(blogRequest.getContent())
                .categoryId(category.getId())
                .tagId(tags.stream().map(Tag::getId).collect(Collectors.toList()))
                .userId(blogRequest.getUserId())
                .build();
        blogRepository.save(blog);

        return "success";
    }

    @Override
    public Map<String, Object> findBlogRelatedByCategoryCode(String categoryCode) {
        Map<String,Object> response = new HashMap<>();
        Category category = categoryService.findByCode(categoryCode);
        Pageable pageable = PageRequest.of(0,5);
        Page<Blog> page = blogRepository.findAllByCategoryId(pageable,category.getId(),BlogStatus.APPROVED);
        List<BlogDTO> blogDTOS = new ArrayList<>();
        if(page.getContent().size() > 0){
            blogDTOS = mappingList(page.getContent());
        }
        response.put("blogs",blogDTOS);
        response.put("message","get blog related success");
        response.put("status", HttpStatus.OK.toString());
        return response;
    }

    @Override
    public Map<String, ?> getBlogCreated() {
        Map<String,Integer> response = new HashMap<>();
        LocalDate localDate = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();;
        Date yesterday = Date.from(localDate.minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date tomorrow =  Date.from(localDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date previousMonth = Date.from(localDate.minusMonths(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
        int totalDay = blogRepository.findByDate(yesterday,tomorrow).size();
        int totayMonth = blogRepository.findByDate(previousMonth,tomorrow).size();
        response.put("today", totalDay);
        response.put("month", totayMonth);
        return response;
    }

    private BlogStatus getBlogStatus(String status){
        return switch (status){
            case "approved" -> BlogStatus.APPROVED;
            case "pending" -> BlogStatus.PENDING;
            case "reject" -> BlogStatus.REJECT;
            default -> null;
        };
    }
}
