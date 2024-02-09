package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.ChatHistory;
import com.chatappbackend.chapappbackend.document.ChatMessage;
import com.chatappbackend.chapappbackend.repository.ChatHistoryRepository;
import com.chatappbackend.chapappbackend.service.ChatHistoryService;
import com.chatappbackend.chapappbackend.service.ChatRoomService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.function.Supplier;

@Service
@RequiredArgsConstructor
public class ChatHistoryServiceImpl implements ChatHistoryService {
    private final ChatRoomService chatRoomService;
    private final ChatHistoryRepository chatHistoryRepository;
    private final SequenceGeneratorService generatorService;
    @Override
    public void save(ChatMessage chatMessage) {
        var chatId = chatRoomService.getChatRoomId(chatMessage.getSenderId(),chatMessage.getRecipientId(),true).orElse("");
       ChatHistory chatHistory =  chatHistoryRepository.findByChatId(chatId).orElse(null);
       if(chatHistory == null){
           createChatHistory(chatMessage,chatId);
           return;
       }
       chatHistory.setSenderId(chatMessage.getSenderId());
       chatHistory.setRecipientId(chatMessage.getRecipientId());
       chatHistory.setDate(new Date());
       chatHistoryRepository.save(chatHistory);


    }

    @Override
    public List<ChatHistory> findByUserId(long userId) {
        return chatHistoryRepository.findBySenderIdOrRecipientId(userId);
    }

    private void createChatHistory(ChatMessage chatMessage, String chatId){
        ChatHistory chatHistory = ChatHistory.builder()
                .id(generatorService.generateSequence(ChatHistory.SEQUENCE_NAME))
                .chatId(chatId)
                .senderId(chatMessage.getSenderId())
                .recipientId(chatMessage.getRecipientId())
                .date(new Date())
                .build();
        chatHistoryRepository.save(chatHistory);
    }
}
