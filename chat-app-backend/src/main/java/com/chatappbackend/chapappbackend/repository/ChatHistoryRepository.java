package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.ChatHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatHistoryRepository extends MongoRepository<ChatHistory,Long> {
    Optional<ChatHistory> findByChatId(String chatId);
    @Query("{ $or: [ { 'senderId': ?0 }, { 'recipientId': ?0 } ] }")
    List<ChatHistory> findBySenderIdOrRecipientId(long userId);
}
