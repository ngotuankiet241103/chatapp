package com.chatappbackend.chapappbackend.service;

import com.chatappbackend.chapappbackend.document.ChatRoom;

import java.util.Optional;

public interface ChatRoomService {
    Optional<String> getChatRoomId(long senderId,
                                   long recipientId,
                                   boolean createNewRoomIfNotExists);

    ChatRoom findByChatIdAndSenderId(String chatId, long userId);
}
