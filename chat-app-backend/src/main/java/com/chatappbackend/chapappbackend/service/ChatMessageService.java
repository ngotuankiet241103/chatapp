package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.ChatMessage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatMessageService {

    ChatMessage save(ChatMessage chatMessage);

    List<ChatMessage> findMessagesBySenderIdAndRecipientId(long senderId, long recipientId, Pageable page);
}
