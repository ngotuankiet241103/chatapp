package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.ChatHistory;
import com.chatappbackend.chapappbackend.document.ChatMessage;

import java.util.List;

public interface ChatHistoryService {
    void save(ChatMessage chatMessage);

    List<ChatHistory> findByUserId(long userId);
}
