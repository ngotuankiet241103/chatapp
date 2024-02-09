package com.chatappbackend.chapappbackend.repository;

import com.chatappbackend.chapappbackend.document.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoom,Long> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(long senderId, long recipientId);

    ChatRoom findByChatIdAndSenderId(String chatId, long userId);

    ;
}
