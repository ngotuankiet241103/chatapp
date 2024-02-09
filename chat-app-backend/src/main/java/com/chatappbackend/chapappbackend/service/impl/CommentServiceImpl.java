package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.Comment;
import com.chatappbackend.chapappbackend.document.User;
import com.chatappbackend.chapappbackend.dto.CommentDTO;
import com.chatappbackend.chapappbackend.dto.UserDTO;
import com.chatappbackend.chapappbackend.mapping.CommentMapping;
import com.chatappbackend.chapappbackend.repository.CommentRepository;
import com.chatappbackend.chapappbackend.request.CommentRequest;
import com.chatappbackend.chapappbackend.service.CommentService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import com.chatappbackend.chapappbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final SequenceGeneratorService generatorService;
    private final CommentMapping commentMapping;
    private final UserService userService;
    @Override
    public Map<String, List<CommentDTO>> findByBlogId(long blogId) {

        Map<String, List<CommentDTO>> response = commentRepository.findByBlogId(blogId).stream()
                .map(comment -> {
                    CommentDTO commentDTO = commentMapping.toDTO(comment);
                    User user = userService.findById(comment.getUserId());
                    UserDTO userDTO = UserDTO.builder()
                                        .id(user.getId())
                                        .avatar(user.getAvatar())
                                        .fullName(user.getFullName())
                                        .build();
                    commentDTO.setUser(userDTO);
                    return commentDTO;
                })
                .collect(Collectors.groupingBy(cmt -> cmt.getTree_id()));;
        return response;
    }

    @Override
    public String save(CommentRequest comment) {
        Comment newComment = null;

        if(comment.getTree_id() != null){
            Comment commentParent = commentRepository.findById(comment.getParentId()).orElse(null);
            newComment = Comment.builder()
                        .id(generatorService.generateSequence(Comment.SEQUENCE_NAME))
                        .blogId(comment.getBlogId())
                        .node_left(commentParent.getNode_left() + 1)
                        .node_right(commentParent.getNode_left() + 2)
                        .tree_id(commentParent.getTree_id())
                        .content(comment.getContent())
                        .userId(comment.getUserId())
                        .parent_id(comment.getParentId())
                        .build();
            updateNode(newComment.getTree_id(), newComment.getNode_left());
            commentRepository.save(newComment);

            return "success";

        }else{
            UUID treeId = UUID.randomUUID();
            newComment = Comment.builder()
                        .id(generatorService.generateSequence(Comment.SEQUENCE_NAME))
                        .blogId(comment.getBlogId())
                        .node_left(1)
                        .node_right(2)
                        .tree_id(treeId.toString())
                        .content(comment.getContent())
                        .userId(comment.getUserId())
                        .parent_id(comment.getParentId())
                        .build();
        }
        commentRepository.save(newComment);
        return "success";
    }
    private void updateNode(String tree_id, int node_left){
        commentRepository.updateNodeLeft(tree_id,node_left);
        commentRepository.updateNodeRight(tree_id,node_left);
    }
}
