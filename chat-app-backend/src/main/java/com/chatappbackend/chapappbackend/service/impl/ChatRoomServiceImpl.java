package com.chatappbackend.chapappbackend.service.impl;

import com.chatappbackend.chapappbackend.document.ChatRoom;
import com.chatappbackend.chapappbackend.repository.ChatRoomRepository;
import com.chatappbackend.chapappbackend.service.ChatRoomService;
import com.chatappbackend.chapappbackend.service.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final SequenceGeneratorService generatorService;
    public Optional<String> getChatRoomId(
            long senderId,
            long recipientId,
            boolean createNewRoomIfNotExists
    ) {
        return chatRoomRepository
                .findBySenderIdAndRecipientId(senderId, recipientId)
                .map(ChatRoom::getChatId)
                .or(() -> {
                    if(createNewRoomIfNotExists) {
                        var chatId = createChatId(senderId, recipientId);
                        return Optional.of(chatId);
                    }

                    return  Optional.empty();
                });
    }

    @Override
    public ChatRoom findByChatIdAndSenderId(String chatId, long userId) {
        return chatRoomRepository.findByChatIdAndSenderId(chatId,userId);
    }

    private String createChatId(long senderId, long recipientId) {
        var chatId = String.format("%s_%s", senderId, recipientId);

        ChatRoom senderRecipient = ChatRoom
                .builder()
                .id(generatorService.generateSequence(ChatRoom.SEQUENCE_NAME))
                .chatId(chatId)
                .senderId(senderId)
                .recipientId(recipientId)
                .build();

        ChatRoom recipientSender = ChatRoom
                .builder()
                .id(generatorService.generateSequence(ChatRoom.SEQUENCE_NAME))
                .chatId(chatId)
                .senderId(recipientId)
                .recipientId(senderId)
                .build();

        chatRoomRepository.save(senderRecipient);
        chatRoomRepository.save(recipientSender);

        return chatId;
    }
}
