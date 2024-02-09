package com.chatappbackend.chapappbackend.rest;

import com.chatappbackend.chapappbackend.contraint.MaxPageItem;
import com.chatappbackend.chapappbackend.document.ChatMessage;
import com.chatappbackend.chapappbackend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("chatMessageAPI")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ChatMessageController {
    private final ChatMessageService chatMessageService;
    @GetMapping("/messages/{senderId}/{recipientId}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable("senderId") long senderId,
                                                         @PathVariable("recipientId") long recipientId, @RequestParam("page") int page){
        Sort sortByTimestampDesc = Sort.by(Sort.Order.desc("timestamp"));
        Pageable pageable = PageRequest.of(page, MaxPageItem.messageMax,sortByTimestampDesc);
        return ResponseEntity.ok(chatMessageService.findMessagesBySenderIdAndRecipientId(senderId,recipientId,pageable));
    }

}
