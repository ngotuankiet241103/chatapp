package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.contraint.MaxPageItem;
import com.chatappbackend.chapappbackend.document.Blog;
import com.chatappbackend.chapappbackend.document.BlogStatus;
import com.chatappbackend.chapappbackend.dto.BlogDTO;
import com.chatappbackend.chapappbackend.request.BlogRequest;
import com.chatappbackend.chapappbackend.service.BlogService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BlogController {
    private  final BlogService blogService;
    @GetMapping("/blogs")
    public Map<String,?> getBlogs(@RequestParam(name = "search",defaultValue = "") String search,
                                  @RequestParam(name = "page",defaultValue = "1") int page,
                                  @RequestParam(name ="limit",defaultValue = MaxPageItem.maxBlogItem+"") int limit) throws JsonProcessingException {
        Pageable pageable = PageRequest.of(page - 1,limit, Sort.by("id").ascending());

        return blogService.findAll(pageable,search);
    }
    @GetMapping("/blogs/{userId}/user")
    public Map<String,?> getBlogsOfUser(@PathVariable("userId") long userId,
                                  @RequestParam(name = "status",defaultValue = "all") String status,
                                  @RequestParam(name = "page",defaultValue = "1") int page,
                                  @RequestParam(name ="limit",defaultValue = MaxPageItem.maxBlogItem+"") int limit){
        Pageable pageable = PageRequest.of(page - 1,limit);

        return blogService.findAllByUserId(userId,status,pageable);
    }
    @GetMapping("/blog/{id}")
    public BlogDTO findById(@PathVariable("id") long id){

        return blogService.findBlogById(id);
    }
    @GetMapping("/blogs/topic/{categoryCode}")
    public Map<String,?> getBlogsByTopicCode(@PathVariable("categoryCode") String code,
                                             @RequestParam(name = "search",defaultValue = "") String search,
                                             @RequestParam(name = "page",defaultValue = "1") int page,
                                  @RequestParam(name ="limit",defaultValue = MaxPageItem.maxBlogItem+"") int limit) throws JsonProcessingException {
        Pageable pageable = PageRequest.of(page - 1,limit,Sort.by("id").ascending());

        return blogService.findAllByTopicCode(code,pageable,search);
    }
    @GetMapping("/blogs/created")
    public Map<String,?> getBlogCreated()  {


        return blogService.getBlogCreated();
    }
    @GetMapping("/blogs/tag/{tagCode}")
    public Map<String,?> getBlogsByTagCode(@PathVariable("tagCode") String code,
                                           @RequestParam(name = "search",defaultValue = "") String search,
                                           @RequestParam(name = "page",defaultValue = "1") int page,
                                           @RequestParam(name ="limit",defaultValue = MaxPageItem.maxBlogItem+"") int limit) throws JsonProcessingException {
        Pageable pageable = PageRequest.of(page - 1,limit,Sort.by("id").ascending());

        return blogService.findAllByTagCode(code,pageable,search);
    }
    @GetMapping("/blog/detail/{code}")
    public BlogDTO findByCode(@PathVariable("code") String code){

        return blogService.findByCode(code);
    }
    @GetMapping("/blogs/{status}")
    public Map<String,?> getBlogsByStatus(@PathVariable("status") BlogStatus status,
                                          @RequestParam(name = "page",defaultValue = "1") int page,
                                          @RequestParam(name ="limit",defaultValue = MaxPageItem.maxBlogItem+"") int limit){
        Pageable pageable = PageRequest.of(page-1,limit);
        return blogService.findByStatus(status,pageable);
    }
    @GetMapping("/blogs/related/{categoryCode}")
    public Map<String,?> getBlogsRelated(@PathVariable("categoryCode") String categoryCode){

        return blogService.findBlogRelatedByCategoryCode(categoryCode);
    }
    @PostMapping("/blog")
    public String addBlog(@RequestBody @Valid BlogRequest blogRequest){
        return blogService.save(blogRequest);
    }

    @PutMapping("/blog/{id}")
    public String updateBlog(@RequestBody @Valid BlogRequest blogRequest,@PathVariable("id") long id){
        return blogService.updateBlog(blogRequest,id);
    }
    @PutMapping("/blog/approved/{id}")
    public String approvedBlog(@PathVariable long id){
        return  blogService.approvedBlog(id);
    }
    @PutMapping("/blog/reject/{id}")
    public String rejectBlog(@PathVariable long id){
        return  blogService.rejectBlog(id);
    }
}
