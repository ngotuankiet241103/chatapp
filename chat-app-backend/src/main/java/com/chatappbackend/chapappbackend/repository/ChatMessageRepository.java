package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage,Long> {
    Page<ChatMessage> findByChatId(Pageable pageable, String chatId);
}
