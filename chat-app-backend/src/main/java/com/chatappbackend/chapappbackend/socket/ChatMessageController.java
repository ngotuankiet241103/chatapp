package com.chatappbackend.chapappbackend.socket;

import com.chatappbackend.chapappbackend.document.ChatMessage;
import com.chatappbackend.chapappbackend.dto.ChatNotification;
import com.chatappbackend.chapappbackend.service.ChatHistoryService;
import com.chatappbackend.chapappbackend.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatMessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;
    private final ChatHistoryService chatHistoryService;
    @MessageMapping("/chat")
    public void processMessage(@Payload ChatMessage chatMessage) {
        ChatMessage savedMsg = chatMessageService.save(chatMessage);
        chatHistoryService.save(chatMessage);
        System.out.println(chatMessage.getRecipientId());
        messagingTemplate.convertAndSend("/topic/"+chatMessage.getRecipientId()+"/messages",new ChatNotification(
                savedMsg.getId(),
                savedMsg.getSenderId(),
                savedMsg.getRecipientId(),
                savedMsg.getContent()
        ));
//        messagingTemplate.convertAndSendToUser(
//                chatMessage.getRecipientId()+"" , "/queue/messages",
//                new ChatNotification(
//                        savedMsg.getId(),
//                        savedMsg.getSenderId(),
//                        savedMsg.getRecipientId(),
//                        savedMsg.getContent()
//                )
//        );
//        return new ChatNotification(
//                savedMsg.getId(),
//                savedMsg.getSenderId(),
//                savedMsg.getRecipientId(),
//                savedMsg.getContent()
//        );
    }

}
