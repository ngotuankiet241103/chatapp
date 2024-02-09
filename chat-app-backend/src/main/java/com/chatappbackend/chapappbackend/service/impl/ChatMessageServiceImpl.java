package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.ChatMessage;
;
import com.chatappbackend.chapappbackend.repository.ChatMessageRepository;
import com.chatappbackend.chapappbackend.service.ChatMessageService;
import com.chatappbackend.chapappbackend.service.ChatRoomService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {
    private final ChatRoomService chatRoom;
    private final ChatMessageRepository chatMessageRepository;
    private final SequenceGeneratorService generatorService;
    @Override
    public ChatMessage save(ChatMessage chatMessage) {

        var chatId = chatRoom.getChatRoomId(chatMessage.getSenderId(),chatMessage.getRecipientId(),true).orElse("");
        chatMessage.setChatId(chatId);
        chatMessage.setId(generatorService.generateSequence(ChatMessage.SEQUENCE_NAME));
        chatMessageRepository.save(chatMessage);
        return chatMessage;
    }

    @Override
    public List<ChatMessage> findMessagesBySenderIdAndRecipientId(long senderId, long recipientId, Pageable page) {
        var chatId = chatRoom.getChatRoomId(senderId,recipientId,true).orElse("");
        List<ChatMessage> chatMessages = chatMessageRepository.findByChatId(page,chatId).getContent();
        List<ChatMessage> chatMessageList = new ArrayList<>();
        for(int i = chatMessages.size() -1 ; i >= 0 ; i--){
            chatMessageList.add(chatMessages.get(i));
        }

        return chatMessageList;
    }
}
